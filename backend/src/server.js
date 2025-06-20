import express from "express";
import audioRoutes from "./routes/audioRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use("/api/audio", audioRoutes);

app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
});