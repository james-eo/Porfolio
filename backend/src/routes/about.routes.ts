import express from "express";
import {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
} from "../controllers/aboutController";

const router = express.Router();

router
  .route("/")
  .get(getAbout)
  .post(createAbout)
  .put(updateAbout)
  .delete(deleteAbout);

export default router;
