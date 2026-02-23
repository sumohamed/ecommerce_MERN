import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../context/Auth/AuthContext";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
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
						<Box sx={{ flexGrow: 0 }}>
							{isAuthenticated ? (
								<>
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
