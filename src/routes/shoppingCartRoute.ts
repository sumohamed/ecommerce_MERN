import express from "express";
import {
	getActiveShoppingCartForUser,
	addItemToShoppingCart,
} from "../services/shoppingCartService";
import validateJWT from "../middleware/validateJWT";
import { ExtendRequest } from "../types/ExtendRequest";

const router = express.Router();

// Get User active cart
router.get("/", validateJWT, async (req: ExtendRequest, res) => {
	// get userId from validateJWT data..
	const userId = req?.user?._id;
	// get the active cart
	const cart = await getActiveShoppingCartForUser({ userId });
	// send the cart
	res.status(200).send(cart);
});

// Post Items into shopping cart
router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
	// get userId from validateJWT data..
	const userId = req?.user?._id;
	// Get data from body
	const { productId, quantity } = req.body;

	const response = await addItemToShoppingCart({
		userId,
		productId,
		quantity,
	});

	res.status(response.statusCode).send(response.data);
});

export default router;
