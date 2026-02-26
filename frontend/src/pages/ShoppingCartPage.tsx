import { Box, ButtonGroup, Button, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { img_url } from "../constants/api_url";
import { useNavigate } from "react-router-dom";

const ShoppingCartPage = () => {
	const navigate = useNavigate();
	const {
		cartItems,
		totalAmount,
		updateItemInCart,
		removeItemInCart,
		clearCart,
	} = useCart();

	const handleQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) return;

		updateItemInCart(productId, quantity);
	};

	const handleRemoveItem = (productId: string) => {
		removeItemInCart(productId);
	};

	const handleCheckout = () => {
		navigate("/checkout");
	};

	return (
		<Container sx={{ mt: 2 }} fixed>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				sx={{ mb: 2 }}
			>
				<Typography variant="h4">My Shopping Cart</Typography>
				<Button onClick={() => clearCart()}>Clear Cart</Button>
			</Box>
			{cartItems.length ? (
				<Box display="flex" flexDirection="column" gap={2} mt={2}>
					{cartItems.map((item) => (
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							sx={{
								border: 1,
								borderColor: "#f5f5f5",
								borderRadius: 5,
								padding: 1,
							}}
							key={item.productId}
						>
							<Box display="flex" alignItems="center" gap={1}>
								<img
									width={50}
									src={`${img_url}${item.image}`}
									alt={item.title}
								/>
								<Box>
									<Typography variant="h6">{item.title}</Typography>
									<Typography>
										{item.quantity} X {item.unitPrice}EGP
									</Typography>
									<Button
										onClick={() => handleRemoveItem(item.productId)}
									>
										remove item
									</Button>
								</Box>
							</Box>
							<ButtonGroup
								variant="contained"
								aria-label="update quantity"
							>
								<Button
									onClick={() =>
										handleQuantity(item.productId, item.quantity + 1)
									}
								>
									+
								</Button>
								<Button
									onClick={() =>
										handleQuantity(item.productId, item.quantity - 1)
									}
								>
									-
								</Button>
							</ButtonGroup>
						</Box>
					))}
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="h4">
							Total Amount: {totalAmount.toFixed(2)} EGP
						</Typography>
						<Button variant="contained" onClick={handleCheckout}>
							Checkout
						</Button>
					</Box>
				</Box>
			) : (
				<Typography>Cart is empty. start Shopping to add items</Typography>
			)}
		</Container>
	);
};

export default ShoppingCartPage;
