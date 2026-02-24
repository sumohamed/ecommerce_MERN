import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api_url } from "../constants/api_url";
import { useAuth } from "../context/Auth/AuthContext";

const ShoppingCartPage = () => {
	const { token } = useAuth();
	const [err, setErr] = useState("");
	const [cart, setCart] = useState();

	useEffect(() => {
		if (!token) {
			return;
		}
		const fetchCart = async () => {
			// get active cart if user has one..
			const response = await fetch(`${api_url}/cart`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				setErr("Failed to fetch user cart, please try again!");
			}

			// Retrun the cart with its data.. if any
			const data = await response.json();
			setCart(data);
		};

		fetchCart();
	}, [token]);

	console.log(cart);
	return (
		<Container sx={{ mt: 2 }}>
			<Typography variant="h4">My Shopping Cart</Typography>
			{err && <Typography variant="h6">{err}</Typography>}
		</Container>
	);
};

export default ShoppingCartPage;
