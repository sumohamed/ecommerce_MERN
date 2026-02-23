import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [username, setUsername] = useState<string | null>(
		localStorage.getItem(USERNAME_KEY),
	);

	const [token, setToken] = useState<string | null>(
		localStorage.getItem(TOKEN_KEY),
	);

	const isAuthenticated = !!token;

	// Auto login fn when new user register
	const login = (username: string, token: string) => {
		setUsername(username);
		setToken(token);

		// retrieve data from client -> can use cookie instead of local storage
		localStorage.setItem(USERNAME_KEY, username);
		localStorage.setItem(TOKEN_KEY, token);
	};

	const logout = () => {
		// remove data from local storage
		localStorage.removeItem(USERNAME_KEY);
		localStorage.removeItem(TOKEN_KEY);
		// remove to clear the navigation bar -> showing login btn.
		setUsername(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider
			value={{ username, token, isAuthenticated, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
