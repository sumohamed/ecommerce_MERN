import shoppingCartModel from "../models/shoppingCartModel";

// Create new shopping cart -> only if user has none
interface createShoppingCartParams {
	userId: string;
}
const createShoppingCart = async ({ userId }: createShoppingCartParams) => {
	const cart = await shoppingCartModel.create({ userId, totalAmount: 0 }); // create
	await cart.save(); // save in DB
	return cart; // return cart...
};

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
