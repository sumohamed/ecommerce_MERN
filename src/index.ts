import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import userRoute from "./routes/userRoute";
import productsRoute from "./routes/productsRoute";
import { seedInitialProducts } from "./services/productServices";

const app = express();
const port = 3001;

app.use(express.json());

// Database connection
mongoose
	.connect("mongodb://localhost:27017/ecommerce")
	.then(() => console.log("Mongo DB is connected"))
	.catch((err) => console.log("Failed to connect with DB", err));

// create static folder for images
app.use(
	"/uploads",
	express.static(path.join(__dirname, "productsData/images")),
);
seedInitialProducts();

// Endpoint DB routes
app.use("/user", userRoute);
app.use("/products", productsRoute);

// Server runner
app.listen(port, () =>
	console.log(`Server is running at: http://localhost:27017:${port}`),
);
