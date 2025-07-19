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

  // Get About Profile (Public)
  static async getAbout(req: Request, res: Response): Promise<void> {
    try {
      const about = await About.findOne({
        visibility: ContentVisibility.PUBLIC,
      });

      if (!about) {
        res.status(404).json({
          success: false,
          message: "About profile not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: about,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching about profile",
        error: error.message,
      });
    }
  }

  // Get About Profile (Admin - includes all visibility levels)
  static async getAboutAdmin(req: Request, res: Response): Promise<void> {
    try {
      const about = await About.findOne();

      if (!about) {
        res.status(404).json({
          success: false,
          message: "About profile not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: about,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching about profile",
        error: error.message,
      });
    }
  }

  // Update About Profile
  static async updateAbout(req: Request, res: Response): Promise<void> {
    try {
      const updateData = req.body;

      const about = await About.findOneAndUpdate({}, updateData, {
        new: true,
        runValidators: true,
        upsert: true,
      });

      res.status(200).json({
        success: true,
        message: "About profile updated successfully",
        data: about,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error updating about profile",
        error: error.message,
      });
    }
  }

  // Delete About Profile
  static async deleteAbout(req: Request, res: Response): Promise<void> {
    try {
      const about = await About.findOneAndDelete({});

      if (!about) {
        res.status(404).json({
          success: false,
          message: "About profile not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "About profile deleted successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error deleting about profile",
        error: error.message,
      });
    }
  }

  // Update Social Links
  static async updateSocialLinks(req: Request, res: Response): Promise<void> {
    try {
      const { socialLinks } = req.body;

      const about = await About.findOneAndUpdate(
        {},
        { socialLinks },
        { new: true, runValidators: true }
      );

      if (!about) {
        res.status(404).json({
          success: false,
          message: "About profile not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Social links updated successfully",
        data: about.socialLinks,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error updating social links",
        error: error.message,
      });
    }
  }

  // Update Availability Status
  static async updateAvailability(req: Request, res: Response): Promise<void> {
    try {
      const { availability } = req.body;

      const about = await About.findOneAndUpdate(
        {},
        { availability },
        { new: true, runValidators: true }
      );

      if (!about) {
        res.status(404).json({
          success: false,
          message: "About profile not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Availability updated successfully",
        data: about.availability,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Error updating availability",
        error: error.message,
      });
    }
  }
}
