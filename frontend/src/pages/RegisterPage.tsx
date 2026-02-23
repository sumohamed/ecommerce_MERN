import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { api_url } from "../constants/api_url";
import { useAuth } from "../context/Auth/AuthContext";

const RegisterPage = () => {
	const [err, setErr] = useState("");
	const { login } = useAuth();

	// getting input field values
	const fNameRef = useRef<HTMLInputElement>(null);
	const lNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	// Submit handler
	const handelRegister = async () => {
		// get values of input user
		const firstName = fNameRef.current?.value;
		const lastName = lNameRef.current?.value;
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		// check if user add all required fields
		if (!firstName || !lastName || !email || !password) {
			setErr("please check your data!");
			return;
		}

		// send user data into DB..
		try {
			const response = await fetch(`${api_url}/user/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ firstName, lastName, email, password }),
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

			console.log("Register success:", token);
		} catch (err) {
			console.error("Register failed:", err);
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
				<Typography variant="h4">Register New Account</Typography>
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
					<TextField
						inputRef={fNameRef}
						label="First name"
						name="firstName"
					/>
					<TextField
						inputRef={lNameRef}
						label="Last name"
						name="lastName"
					/>
					<TextField inputRef={emailRef} label="Email" name="email" />
					<TextField
						inputRef={passwordRef}
						label="Password"
						name="password"
					/>
					<Button onClick={handelRegister} variant="contained">
						Register
					</Button>
					{err && <Typography sx={{ color: "red" }}>{err}</Typography>}
				</Box>
			</Box>
		</Container>
	);
};

export default RegisterPage;
