import { Request, Response } from "express";
import About from "../models/about.model";
import { AboutDocument } from "../types/about.types";
import { ContentVisibility } from "../types/common.types";

export class AboutController {
  // Create About Profile
  static async createAbout(req: Request, res: Response): Promise<void> {
    try {
      const aboutData = req.body;

      // Check if about profile already exists
      const existingAbout = await About.findOne();
      if (existingAbout) {
        res.status(400).json({
          success: false,
          message: "About profile already exists. Use update instead.",
        });
        return;
      }

      const about = new About(aboutData);
      await about.save();

      res.status(201).json({
        success: true,
        message: "About profile created successfully",
        data: about,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error creating about profile",
        error: error.message,
      });
    }
  }
}
