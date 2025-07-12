import express from "express";
import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  toggleReadStatus,
} from "../controllers/contact.controller";

const router = express.Router();

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).delete(deleteContact);
router.route("/:id/read").put(toggleReadStatus);

export default router;
