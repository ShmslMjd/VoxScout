import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        //we store the database credential in a secret environment (.env)
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MONGODB CONNECTED SUCESSFULLY!");
    }catch (error) {
        console.error("ERROR CONNECTING TO MONGODB", error);
        process.exit(1) //exit with failure
    } 
};