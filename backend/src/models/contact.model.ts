import mongoose, { type Schema } from "mongoose";
import { ContactDocument } from "../types";

const contactSchema: Schema<ContactDocument> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    subject: {
      type: String,
      required: [true, "Please enter a subject"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Please enter your message"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters long"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model<ContactDocument>("Contact", contactSchema);
export default Contact;
