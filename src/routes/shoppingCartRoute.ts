import express from "express";
import { getActiveShoppingCartForUser } from "../services/shoppingCartService";
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

export default router;
