import { IOrderItem, orderModel } from "../models/orderMode";
import productModel from "../models/productModel";
import shoppingCartModel from "../models/shoppingCartModel";

// 1. Create new shopping cart -> only if user has none
interface createShoppingCartParams {
	userId: string;
}
const createShoppingCart = async ({ userId }: createShoppingCartParams) => {
	const cart = await shoppingCartModel.create({ userId, totalAmount: 0 }); // create
	await cart.save(); // save in DB
	return cart; // return cart...
};

// 2. Get Active cart from database
interface getActiveShoppingCartParams {
	userId: string;
	populateProduct?: boolean;
}
export const getActiveShoppingCartForUser = async ({
	userId,
	populateProduct,
}: getActiveShoppingCartParams) => {
	let cart;
	if (populateProduct) {
		cart = await shoppingCartModel
			.findOne({ userId, status: "active" })
			.populate("items.product"); // search and return product data to use it in frontend when user adds item to cart
	} else {
		cart = await shoppingCartModel.findOne({ userId, status: "active" }); // search
	}

	if (!cart) {
		cart = await createShoppingCart({ userId }); // create if no cart in DB
	}
	return cart; // return
};

// 3. Adding Items to shopping cart
interface addItemToShoppingCartParams {
	productId: any;
	quantity: number;
	userId: string;
}
export const addItemToShoppingCart = async ({
	productId,
	quantity,
	userId,
}: addItemToShoppingCartParams) => {
	try {
		// Get the active cart
		const cart = await getActiveShoppingCartForUser({ userId });

		// check if item already exists in cart
		const existsInCart = cart.items.find(
			(p) => p.product.toString() === productId,
		);
		if (existsInCart) {
			return { data: "item already exists in cart", statusCode: 400 };
		}

		// if item not found in cart add it
		const product = await productModel.findById(productId);

		if (!product) {
			return { data: "Product not Found", statusCode: 400 };
		}

		if (product.stock < quantity) {
			return { data: "Low stock for this product", statusCode: 400 };
		}

		cart.items.push({
			product: productId,
			unitPrice: product.price,
			quantity,
		});

		// Upate total Amount of cart
		cart.totalAmount += product.price * quantity;

		await cart.save();

		return {
			// return full product details for frontend ..
			data: await getActiveShoppingCartForUser({
				userId,
				populateProduct: true,
			}),
			statusCode: 201,
		};
	} catch {
		return { data: "something went Wrong", statusCode: 500 };
	}
};

// 4. Updating item in cart
interface updateItemInCartParams {
	productId: any;
	quantity: number;
	userId: string;
}
export const updateItemInCart = async ({
	productId,
	quantity,
	userId,
}: updateItemInCartParams) => {
	try {
		// Get the active cart
		const cart = await getActiveShoppingCartForUser({ userId });
		// check if item already exists in cart
		const existsInCart = cart.items.find(
			(p) => p.product.toString() === productId,
		);
		if (!existsInCart) {
			return { data: "item doesn't exists in cart", statusCode: 400 };
		}

		// Setting new Quantity
		const product = await productModel.findById(productId);

		if (!product) {
			return { data: "Product not Found", statusCode: 400 };
		}

		if (product.stock < quantity) {
			return { data: "Low stock for this product", statusCode: 400 };
		}

		existsInCart.quantity = quantity;

		// Setting New Total price
		const oldCartItems = cart.items.filter(
			(p) => p.product.toString() !== productId,
		);

		let total = oldCartItems.reduce((sum, product) => {
			sum += product.quantity * product.unitPrice;
			return sum;
		}, 0);

		total += existsInCart.quantity * existsInCart.unitPrice; // new price of updated item
		cart.totalAmount = total;

		// Update and return the new cart
		await cart.save();
		return {
			data: await getActiveShoppingCartForUser({
				userId,
				populateProduct: true,
			}),
			statusCode: 200,
		};
	} catch {
		return { data: "something went Wrong", statusCode: 500 };
	}
};

//5. Delete Item from shopping cart
interface deleteItemInCartParams {
	productId: any;
	userId: string;
}
export const deleteItemInCart = async ({
	userId,
	productId,
}: deleteItemInCartParams) => {
	try {
		// Get the active cart
		const cart = await getActiveShoppingCartForUser({ userId });

		// check if item already exists in cart
		const existsInCart = cart.items.find(
			(p) => p.product.toString() === productId,
		);
		if (!existsInCart) {
			return { data: "item doesn't exists in cart", statusCode: 400 };
		}

		// Filter the deleted item
		const newCartItems = cart.items.filter(
			(p) => p.product.toString() !== productId,
		);

		let total = newCartItems.reduce((sum, product) => {
			sum += product.quantity * product.unitPrice;
			return sum;
		}, 0);

		cart.items = newCartItems;
		cart.totalAmount = total;

		// Update and return the new cart
		await cart.save();
		return {
			data: await getActiveShoppingCartForUser({
				userId,
				populateProduct: true,
			}),
			statusCode: 200,
		};
	} catch {
		return { data: "something went Wrong", statusCode: 500 };
	}
};

// 6. Clear whole shopping cart
interface clearShoppingCartParams {
	userId: string;
}
export const clearShoppingCart = async ({
	userId,
}: clearShoppingCartParams) => {
	try {
		// Get the active cart
		const cart = await getActiveShoppingCartForUser({ userId });
		cart.items = [];
		cart.totalAmount = 0;

		await cart.save();

		return {
			data: await getActiveShoppingCartForUser({
				userId,
				populateProduct: true,
			}),
			statusCode: 200,
		};
	} catch {
		return { data: "something went Wrong", statusCode: 500 };
	}
};

// 7. Checkout -> convert status from "active" to "completed"
interface checkoutShoppingCartParams {
	userId: string;
	address: string;
}
export const checkoutShoppingCart = async ({
	userId,
	address,
}: checkoutShoppingCartParams) => {
	try {
		const cart = await getActiveShoppingCartForUser({ userId });
		const orderItems: IOrderItem[] = [];

		// check for address
		if (!address) {
			return { data: "Please, add your address", statusCode: 400 };
		}

		// create order items
		for (const item of cart.items) {
			const product = await productModel.findById(item.product);

			if (!product) {
				return { data: "Product not Fount", statusCode: 400 };
			}

			const orderItem: IOrderItem = {
				productTitle: product.title,
				productImage: product.image,
				quantity: item.quantity,
				unitPrice: item.unitPrice,
			};

			orderItems.push(orderItem);
		}

		// create order itself
		const order = await orderModel.create({
			orderItems,
			userId,
			total: cart.totalAmount,
			address,
		});

		await order.save();

		// Update cart Status to be Completed
		cart.status = "completed";
		await cart.save();
		return { data: order, statusCode: 201 };
	} catch {
		return { data: "something went Wrong", statusCode: 500 };
	}
};
