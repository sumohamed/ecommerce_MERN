import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api_url } from "../constants/api_url";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

const ShoppingCartPage = () => {
	const { token } = useAuth();
	const [err, setErr] = useState("");
	const { cartItems, totalAmount } = useCart();

	// useEffect(() => {
	// 	if (!token) {
	// 		return;
	// 	}
	// 	const fetchCart = async () => {
	// 		// get active cart if user has one..
	// 		const response = await fetch(`${api_url}/cart`, {
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		});

	// 		if (!response.ok) {
	// 			setErr("Failed to fetch user cart, please try again!");
	// 		}

	// 		// Retrun the cart with its data.. if any
	// 		const data = await response.json();
	// 		setCart(data);
	// 	};

	// 	fetchCart();
	// }, [token]);

	// console.log(cart);
	return (
		<Container sx={{ mt: 2 }}>
			<Typography variant="h4">My Shopping Cart</Typography>
			{cartItems.map((item) => (
				<Box key={item.productId}>{item.title}</Box>
			))}
			{err && <Typography variant="h6">{err}</Typography>}
		</Container>
	);
};

export default ShoppingCartPage;
