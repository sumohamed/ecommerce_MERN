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
}
export const getActiveShoppingCartForUser = async ({
	userId,
}: getActiveShoppingCartParams) => {
	let cart = await shoppingCartModel.findOne({ userId, status: "active" }); // search

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

	cart.items.push({ product: productId, unitPrice: product.price, quantity });

	// Upate total Amount of cart
	cart.totalAmount += product.price * quantity;

	const updatedCart = await cart.save();
	return { data: updatedCart, statusCode: 201 };
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
	const updatedCart = await cart.save();
	return { data: updatedCart, statusCode: 200 };
};
