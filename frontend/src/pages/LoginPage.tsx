import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { api_url } from "../constants/api_url";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [err, setErr] = useState("");
	const { login } = useAuth();

	// getting input field values
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	// Navigation
	const navigate = useNavigate();

	// Submit handler
	const handelRegister = async () => {
		// get values of input user
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		// check if user add all required fields
		if (!email || !password) {
			setErr("please check your data!");
			return;
		}

		// send user data into DB..
		try {
			const response = await fetch(`${api_url}/user/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			}); // sending data with its request details

			if (!response.ok) {
				const text = await response.text();
				setErr(text);
				return;
			} // sending the error we set in backend if user already exists
			const token = await response.json(); // get token to log user in

			if (!token) {
				setErr("Incorrect token");
				return;
			} // token validation

			login(email, token); // login operation to send him into homepage as logged in user coming from useAuth hook

			// Redirect to otherpage
			navigate("/");

			console.log("Login success:", token);
		} catch (err) {
			console.error("Login failed:", err);
		}
	};

	return (
		<Container>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
					mt: 4,
				}}
			>
				<Typography variant="h4">Login to Your Account</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						mt: 2,
						border: 1,
						p: 2,
						borderColor: "#f5f5f5",
						borderRadius: 1,
					}}
				>
					<TextField inputRef={emailRef} label="Email" name="email" />
					<TextField
						inputRef={passwordRef}
						label="Password"
						name="password"
					/>
					<Button onClick={handelRegister} variant="contained">
						Login
					</Button>
					{err && <Typography sx={{ color: "red" }}>{err}</Typography>}
				</Box>
			</Box>
		</Container>
	);
};

export default LoginPage;
