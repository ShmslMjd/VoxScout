import express from "express"
import {createAISoftware, getAISoftware, getSoftwareById} from "../controllers/aiSoftwareController.js";

const router = express.Router();

router.get("/", getAISoftware);
router.get("/:id", getSoftwareById);
router.post("/", createAISoftware);
/*router.put("/:id", updateAISoftware);
router.delete("/:id", deleteAISoftware);
router.get('/search', searchSoftware);
router.post('/:id/reviews', updateSoftwareReviews);*/

export default router;
