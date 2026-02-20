import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const app = express();
const port = 3001;

app.use(express.json());

// Database connection
mongoose
	.connect("mongodb://localhost:27017/ecommerce")
	.then(() => console.log("Mongo DB is connected"))
	.catch((err) => console.log("Failed to connect with DB", err));

// Endpoint DB routes
app.use("/user", userRoute);

// Server runner
app.listen(port, () =>
	console.log(`Server is running at: http://localhost:27017:${port}`),
);
