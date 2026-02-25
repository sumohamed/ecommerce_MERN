import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/cartItems";
import { api_url } from "../../constants/api_url";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const { token } = useAuth(); // getting token that hold user details.
	const [cartItems, setCartItems] = useState<CartItem[]>([]); // getting all items [what user adds it]
	const [totalAmount, setTotalAmount] = useState<number>(0); // getting total amount -> calculated in backend
	const [err, setErr] = useState("");

	const addItemToCart = async (productId: string) => {
		try {
			// getting items in cart.. post method to get product id -> the populated one from backend to get all details of that product, and set always quantity to 1 as initial..
			const response = await fetch(`${api_url}/cart/items`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					productId,
					quantity: 1,
				}),
			});

			if (!response.ok) {
				setErr("Faild to add to cart");
			}

			// result of fetching is the cart with items..
			const cart = await response.json();
			if (!cart) {
				setErr("Faild to parse cart data");
			}

			// fetching result is main obj that holds [cart id, user id, total amount, quantity, unitPrice, and active status, And items as nested obj]
			// here we don't need all of these so we did a map to extract only what we need.
			// what we need is product details and it's unit price according to quantity...
			const cartItemsMapped = cart.items.map(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				({ product, quantity }: { product: any; quantity: number }) => ({
					productId: product._id,
					title: product.title,
					image: product.image,
					unitPrice: product.unitPrice,
					quantity,
				}),
			);

			setCartItems([...cartItemsMapped]);
			setTotalAmount(cart.totalAmount);
		} catch {
			setErr("Faild to add to cart");
		}
	};

	return (
		<CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
