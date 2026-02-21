import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import userRoute from "./routes/userRoute";
import productsRoute from "./routes/productsRoute";
import shoppingCartRoute from "./routes/shoppingCartRoute";
import { seedInitialProducts } from "./services/productServices";

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json()); // middleware for json objects

// Database connection
mongoose
	.connect(process.env.DATABASE_URL || "")
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
app.use("/cart", shoppingCartRoute);

// Server runner
app.listen(port, () =>
	console.log(`Server is running at: http://localhost:27017:${port}`),
);
