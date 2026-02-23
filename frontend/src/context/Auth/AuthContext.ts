// AuthContext ->  our data controller [get, send & save] data to pass it to other pages
// AuthProvider -> our application wrapper to control what pages to show according to users data and logic of app.

import { createContext, useContext } from "react";

interface AuthContextType {
	username: string | null;
	token: string | null;
	login: (username: string, token: string) => void;
	isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
	username: null,
	token: null,
	login: () => {},
	isAuthenticated: false,
}); // [data storage] -> when useAuth hook gets data will be saved here to use in other pages using import..

export const useAuth = () => useContext(AuthContext); // get and send user data [operation logic of getting and sending data]

// user to login needs his username and his generated token from register operation -> according to our logic in backend

// to get userdata -> we need context state to pass it between components:
// ---> 1. getting data from register page..
// ---> 2. send this data into navbar -> to update his profile button...
// ---> 3. send this data into his shopping cart -> to make an order...
