import mongoose, { Document, Schema, ObjectId } from "mongoose";
import { IProduct } from "./productModel";

const ShoppingCartStatusEnum = ["active", "completed"];

export interface ICartItem extends Document {
	product: IProduct;
	unitPrice: number;
	quantity: number;
} // each product in the cart

export interface IShoppingCart extends Document {
	userId: string | ObjectId;
	items: ICartItem[];
	totalAmount: number;
	status: "active" | "completed";
} // Whole shopping cart

const cartItemSchema = new Schema<ICartItem>({
	product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
	quantity: { type: Number, required: true, default: 1 },
	unitPrice: { type: Number, required: true },
}); // each item schema

const shoppingCartSchema = new Schema<IShoppingCart>({
	userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	items: [cartItemSchema],
	totalAmount: { type: Number, required: true },
	status: { type: String, enum: ShoppingCartStatusEnum, default: "active" },
}); // shopping cart schema

const shoppingCartModel = mongoose.model<IShoppingCart>(
	"Cart",
	shoppingCartSchema,
);

export default shoppingCartModel;
