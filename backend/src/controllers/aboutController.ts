import type { Request, Response, NextFunction } from "express";
import About from "../models/about.model";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../utils/asyncHandler";

// @desc Get about information
// @route GET /api/about
// @access Public
export const getAbout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const about = await About.findOne();
    if (!about) {
      return next(new ErrorResponse("About information not found", 404));
    }
    res.status(200).json({
      success: true,
      data: about,
    });
  }
);

// @desc Get about information
// @route POST /api/about
// @access Private (Admin only)

export const createAbout = asyncHandler(
  async (req: Request, response: Response, next: NextFunction) => {
    // check if about already exists
    const existingAbout = await About.findOne();
    if (existingAbout) {
      return next(new ErrorResponse("About information already exists", 400));
    }
    // Create new about information
    const about = await About.create(req.body);
    response.status(201).json({
      success: true,
      data: about,
    });
  }
);

// @desc Update about information
// @route PUT /api/about
// @access Private (Admin only)

export const updateAbout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let about = await About.findOne();
    if (!about) {
      // create new about information if it doesn't exist
      about = await About.create(req.body);
    } else {
      // Update existing about information
      about = await About.findByIdAndUpdate(about._id, req.body, {
        new: true,
        runValidations: true,
      });
    }
    res.status(200).json({
      success: true,
      data: about,
    });
  }
);

// @desc Delete about information
// @route DELETE /api/about
// @access Private (Admin only)
export const deleteAbout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const about = await About.findOne();
    if (!about) {
      return next(new ErrorResponse("About information not found", 404));
    }
    await About.deleteOne();
    res.status(200).json({
      success: true,
      message: "About information deleted successfully",
      data: {},
    });
  }
);
