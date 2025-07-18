import express from "express"
import {createAISoftware, getAISoftware, getSoftwareById, searchSoftware} from "../controllers/aiSoftwareController.js";

const router = express.Router();

router.get('/search', searchSoftware);
router.get("/", getAISoftware);
router.post("/", createAISoftware);
router.get("/:id", getSoftwareById);
/*router.put("/:id", updateAISoftware);
router.delete("/:id", deleteAISoftware);
router.post('/:id/reviews', updateSoftwareReviews);*/

export default router;
