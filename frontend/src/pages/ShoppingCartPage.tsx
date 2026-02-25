import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api_url } from "../constants/api_url";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

const ShoppingCartPage = () => {
	const { token } = useAuth();
	const [err, setErr] = useState("");
	const { cartItems, totalAmount } = useCart();

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
