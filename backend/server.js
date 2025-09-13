import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./Routes/productRoutes.js";
import { sql } from "../backend/config/db.js";

import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static("public")); // For serving static files
app.use(cors()); // For enabling CORS
app.use(helmet({
    contentSecurityPolicy: false,
})); // For security headers
app.use(morgan("dev")); // For logging requests



app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
    //serve our react app
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})
}

async function initDB() {
    try {
        await sql `CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        )`;
        console.log("Connected to the database and ensured products table exists.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

