// AS A dashboard -> adding product to DB to sell it
import InitProducts from "../productsData/InitProducts";
import productModel from "../models/productModel";

export const seedInitialProducts = async () => {
	try {
		const products = await getAllProducts();
		if (products.length === 0) {
			await productModel.insertMany(InitProducts);
		}
	} catch (err) {
		console.error("can't see DB", err);
	}
};

export const getAllProducts = async () => {
	return await productModel.find();
};
