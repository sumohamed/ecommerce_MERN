import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [username, setUsername] = useState<string | null>(
		localStorage.getItem("username"),
	);

	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token"),
	);

	// Auto login fn when new user register
	const login = (username: string, token: string) => {
		setUsername(username);
		setToken(token);

		// retrieve data from client -> can use cookie instead of local storage
		localStorage.setItem("username", username);
		localStorage.setItem("token", token);
	};

	return (
		<AuthContext.Provider value={{ username, token, login }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
