import express from "express"
import { createAISoftware, deleteAISoftware, getAISoftware, getSoftwareById, updateAISoftware } from "../controllers/aiSoftwareController.js";

const router = express.Router();

router.get("/", getAISoftware);
router.get("/:id", getSoftwareById);
router.post("/", createAISoftware);
router.put("/:id", updateAISoftware);
router.delete("/:id", deleteAISoftware);

export default router;
