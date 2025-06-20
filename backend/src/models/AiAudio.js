import mongoose from "mongoose";

// 1st step: create a schema
// 2nd step: create a model based on that schema

const audioSchema = new mongoose.Schema(
    {
    softwareName:{
        type:String,
        required: true,
    },
    features: {
        type: String,
        required: true,
    },
    },
    {timestamps: true}
);

const Audio = mongoose.model("Audio", audioSchema)

export default Audio;