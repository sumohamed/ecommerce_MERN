import express from "express";
import {
	getActiveShoppingCartForUser,
	addItemToShoppingCart,
	updateItemInCart,
	deleteItemInCart,
	clearShoppingCart,
	checkoutShoppingCart,
} from "../services/shoppingCartService";
import validateJWT from "../middleware/validateJWT";
import { ExtendRequest } from "../types/ExtendRequest";

const router = express.Router();

// 1. Get User active cart
router.get("/", validateJWT, async (req: ExtendRequest, res) => {
	try {
		// get userId from validateJWT data..
		const userId = req?.user?._id;
		// get the active cart
		const cart = await getActiveShoppingCartForUser({ userId });
		// send the cart
		res.status(200).json(cart);
	} catch {
		res.status(500).json("Something went Wrong");
	}
});

// 2. Post Items into shopping cart
router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
	try {
		// get userId from validateJWT data..
		const userId = req?.user?._id;
		// Get data from body
		const { productId, quantity } = req.body;

		const response = await addItemToShoppingCart({
			userId,
			productId,
			quantity,
		});

		res.status(response.statusCode).json(response.data);
	} catch {
		res.status(500).json("Something went Wrong");
	}
});

// 3. Update item into shopping cart
router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
	try {
		const userId = req?.user?._id;
		const { productId, quantity } = req.body;
		const response = await updateItemInCart({ userId, productId, quantity });
		res.status(response.statusCode).json(response.data);
	} catch {
		res.status(500).json("Something went Wrong");
	}
});

// 4. Delete item from shopping cart
router.delete(
	"/items/:productId",
	validateJWT,
	async (req: ExtendRequest, res) => {
		try {
			const userId = req?.user?._id; // user id
			const { productId } = req.params; // itemId get it from /:id
			const response = await deleteItemInCart({ userId, productId });
			res.status(response.statusCode).json(response.data);
		} catch {
			res.status(500).json("Something went Wrong");
		}
	},
);

// 5. Clear whole shopping cart
router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
	try {
		const userId = req?.user?._id; // user id
		const response = await clearShoppingCart({ userId });
		res.status(response.statusCode).json(response.data);
	} catch {
		res.status(500).json("Something went Wrong");
	}
});

// 6. Checkout shopping cart [change active to completed for order]
router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
	try {
		const userId = req?.user?._id; // user id
		const { address } = req.body;
		const response = await checkoutShoppingCart({ userId, address });
		res.status(response.statusCode).json(response.data);
	} catch {
		res.status(500).json("Something went Wrong");
	}
});

export default router;
