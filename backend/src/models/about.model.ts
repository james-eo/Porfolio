import mongoose, { type Schema } from "mongoose";
import { AboutDocument } from "../types";

const aboutSchema: Schema<AboutDocument> = new mongoose.Schema(
  {
    summary: {
      type: String,
      required: [true, "Please add a summary"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      website: String,
    },
    contactInfo: {
      email: String,
      phone: String,
    },
  },
  { timestamps: true }
);

const About = mongoose.model<AboutDocument>("About", aboutSchema);
export default About;
