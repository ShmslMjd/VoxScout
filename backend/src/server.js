import express from "express";
import aiSoftwareRoutes from "./routes/aiSoftwareRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(express.json()); // for parsing application/json
app.use(rateLimiter);

//simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//     next(); // pass control to the next middleware function
// });

app.use("/api/audio", aiSoftwareRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
    });
});