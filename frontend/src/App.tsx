import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/Auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CartProvider from "./context/Cart/CartProvider";
import CheckoutPage from "./pages/CheckoutPage";
import OrederSuccessPage from "./pages/OrederSuccessPage";

const App = () => {
	return (
		<AuthProvider>
			<CartProvider>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route element={<ProtectedRoute />}>
							<Route path="/cart" element={<ShoppingCartPage />} />
							<Route path="/checkout" element={<CheckoutPage />} />
							<Route
								path="/order-success"
								element={<OrederSuccessPage />}
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</AuthProvider>
	);
};

export default App;
