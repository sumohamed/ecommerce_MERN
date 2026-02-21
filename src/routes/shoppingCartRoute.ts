import express from "express";
import {
	getActiveShoppingCartForUser,
	addItemToShoppingCart,
	updateItemInCart,
	deleteItemInCart,
	clearShoppingCart,
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

// Update item into shopping cart
router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
	const userId = req?.user?._id;
	const { productId, quantity } = req.body;
	const response = await updateItemInCart({ userId, productId, quantity });
	res.status(response.statusCode).send(response.data);
});

// Delete item from shopping cart
router.delete(
	"/items/:productId",
	validateJWT,
	async (req: ExtendRequest, res) => {
		const userId = req?.user?._id; // user id
		const { productId } = req.params; // itemId get it from /:id
		const response = await deleteItemInCart({ userId, productId });
		res.status(response.statusCode).send(response.data);
	},
);

// Clear whole shopping cart
router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
	const userId = req?.user?._id; // user id
	const response = await clearShoppingCart({ userId });
	res.status(response.statusCode).send(response.data);
});

export default router;
