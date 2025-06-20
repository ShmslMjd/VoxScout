import express from "express"
import { createAudio, deleteAudio, getAllAudio, updateAudio } from "../controllers/audioController.js";

const router = express.Router();

router.get("/", getAllAudio);
router.post("/", createAudio);
router.put("/:id", updateAudio);
router.delete("/:id", deleteAudio);

export default router;
