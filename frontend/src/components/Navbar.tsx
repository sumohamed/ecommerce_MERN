import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import {
	MenuItem,
	Tooltip,
	Avatar,
	Menu,
	Container,
	Button,
	Grid,
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Badge,
} from "@mui/material";
import { useCart } from "../context/Cart/CartContext";

const Navbar = () => {
	const { cartItems } = useCart();

	// Passing auth into navbar
	const { username, isAuthenticated, logout } = useAuth();

	const navigate = useNavigate();
	const handleLogin = () => {
		navigate("/login");
	};

	const handleLogout = () => {
		logout();
		navigate("/");
		handleCloseUserMenu();
	};

	const handleShoppingCart = () => {
		navigate("/cart");
	};

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%",
						}}
					>
						<Button
							className="logo"
							sx={{ color: "#fff" }}
							variant="text"
							onClick={() => navigate("/")}
						>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<AdbIcon sx={{ display: "flex", mr: 1 }} />
								<Typography
									variant="h6"
									noWrap
									component="a"
									sx={{
										mr: 2,
										display: "flex",
										fontFamily: "monospace",
										fontWeight: 700,
									}}
								>
									Tech Hub
								</Typography>
							</Box>
						</Button>
						<Box
							sx={{
								display: "flex",
								flexGrow: 0,
								alignItems: "center",
								justifyContent: "center",
								gap: 4,
							}}
						>
							{isAuthenticated ? (
								<>
									<IconButton
										aria-label="shopping-cart"
										onClick={handleShoppingCart}
									>
										<Badge
											badgeContent={cartItems.length}
											color="secondary"
										>
											<ShoppingCart sx={{ color: "#fff" }} />
										</Badge>
									</IconButton>
									<Tooltip title="Open settings">
										<Grid
											container
											alignItems="center"
											justifyContent="center"
											gap={2}
										>
											<Grid>
												<Typography>{username}</Typography>
											</Grid>
											<Grid>
												<IconButton
													onClick={handleOpenUserMenu}
													sx={{ p: 0 }}
												>
													<Avatar
														alt={username || ""}
														src="/static/images/avatar/2.jpg"
													/>
												</IconButton>
											</Grid>
										</Grid>
									</Tooltip>
									<Menu
										sx={{ mt: "45px" }}
										id="menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
									>
										<MenuItem onClick={handleCloseUserMenu}>
											<Typography sx={{ textAlign: "center" }}>
												Profile
											</Typography>
										</MenuItem>
										<MenuItem onClick={handleLogout}>
											<Typography sx={{ textAlign: "center" }}>
												Logout
											</Typography>
										</MenuItem>
									</Menu>
								</>
							) : (
								<Button
									onClick={handleLogin}
									variant="contained"
									color="success"
								>
									Login
								</Button>
							)}
						</Box>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Navbar;
