// AS A dashboard -> adding product to DB to sell it

import { initProducts } from "../productsData/products";
import productModel from "../models/productModel";

export const seedInitialProducts = async () => {
	const products = await getAllProducts();
	if (products.length === 0) {
		await productModel.insertMany(initProducts);
	}
};

export const getAllProducts = async () => {
	return await productModel.find();
};
