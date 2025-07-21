import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import aiSoftwareRoutes from "./routes/aiSoftwareRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}
app.use(express.json()); // for parsing application/json
app.use(rateLimiter);

//simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//     next(); // pass control to the next middleware function
// });

app.use("/api/audio", aiSoftwareRoutes);
app.use('/api/users', userRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
    });
});