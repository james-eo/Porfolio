import express from "express";
import { getAbout, updateAbout } from "../controllers/aboutController";

const router = express.Router();

router.route("/").get(getAbout).post(updateAbout);

export default router;
