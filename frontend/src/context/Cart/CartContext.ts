import { createContext, useContext } from "react";
import type { CartItem } from "../../types/cartItems";

// when user press on add to cart -> we need to get [product details, total Amount] user id and token will get it from auth...
interface CartContextType {
	cartItems: CartItem[];
	totalAmount: number;
	addItemToCart: (productId: string) => void; // when user clicks do what's in my provider.. to be displayed in shopping cart page
	updateItemInCart: (productId: string, quantity: number) => void;
	removeItemInCart: (productId: string) => void;
	clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
	cartItems: [],
	totalAmount: 0,
	addItemToCart: () => {},
	updateItemInCart: () => {},
	removeItemInCart: () => {},
	clearCart: () => {},
});

export const useCart = () => useContext(CartContext);
