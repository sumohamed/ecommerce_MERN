import express from "express";
import { login, register } from "../services/userServices";
const router = express.Router();

// [1] Post register
router.post("/register", async (req, res) => {
	try {
		// get data from request
		const { firstName, lastName, email, password } = req.body;
		const { statusCode, data } = await register({
			firstName,
			lastName,
			email,
			password,
		});

		// send data
		res.status(statusCode).json(data);
	} catch {
		res.status(500).json("Something went Wrong");
	}
});

// [2] Post Login
router.post("/login", async (req, res) => {
	try {
		// get data from request
		const { email, password } = req.body;
		const { statusCode, data } = await login({
			email,
			password,
		});

		// send data
		res.status(statusCode).json(data);
	} catch {
		res.status(500).json("Something went Wrong");
	}
});

export default router;
