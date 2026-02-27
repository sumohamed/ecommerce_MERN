import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { api_url, img_url } from "../constants/api_url";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const CheckoutPage = () => {
	const { cartItems, totalAmount } = useCart();
	const addressRef = useRef<HTMLInputElement>(null);
	const { token } = useAuth();
	const navigate = useNavigate();
	const handleConfirmOrder = async () => {
		const address = addressRef.current?.value;
		if (!address) return;

		const response = await fetch(`${api_url}/cart/checkout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				address,
			}),
		});
		if (!response.ok) return;
		navigate("/order-success");
	};

	return (
		<Container
			sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
			fixed
		>
			<Box>
				<Typography sx={{ textAlign: "center", mb: 2 }} variant="h4">
					Checkout
				</Typography>
				<TextField
					inputRef={addressRef}
					label="Delivery Address"
					name="Address"
					fullWidth
				/>
			</Box>
			<>
				{cartItems.length ? (
					<Box
						display="flex"
						flexDirection="column"
						gap={2}
						sx={{
							border: 1,
							borderColor: "#f5f5f5",
							borderRadius: 5,
							padding: 1,
						}}
					>
						{cartItems.map((item) => (
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								width="100%"
								key={item.productId}
							>
								<Box
									display="flex"
									alignItems="center"
									gap={1}
									width="100%"
								>
									<img
										width={50}
										src={`${img_url}${item.image}`}
										alt={item.title}
									/>
									<Box
										display="flex"
										justifyContent="space-between"
										alignItems="center"
										width="100%"
									>
										<Typography variant="h6">{item.title}</Typography>
										<Typography>
											{item.quantity} X {item.unitPrice}EGP
										</Typography>
									</Box>
								</Box>
							</Box>
						))}

						<Typography variant="body2" sx={{ textAlign: "right" }}>
							Total Amount: {totalAmount.toFixed(2)} EGP
						</Typography>
					</Box>
				) : (
					<Typography>
						Cart is empty. start Shopping to add items
					</Typography>
				)}
			</>
			<Button variant="contained" fullWidth onClick={handleConfirmOrder}>
				pay now
			</Button>
		</Container>
	);
};

export default CheckoutPage;
