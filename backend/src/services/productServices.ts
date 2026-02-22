// AS A dashboard -> adding product to DB to sell it
import { initProducts } from "../../productsData/products";
import productModel from "../models/productModel";

export const seedInitialProducts = async () => {
	try {
		const products = await getAllProducts();
		if (products.length === 0) {
			await productModel.insertMany(initProducts);
		}
	} catch (err) {
		console.error("can't see DB", err);
	}
};

export const getAllProducts = async () => {
	return await productModel.find();
};
