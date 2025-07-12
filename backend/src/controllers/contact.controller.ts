import type { Request, Response, NextFunction } from "express";
import Contact from "../models/contact.model";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../utils/asyncHandler";

/**
 * @desc    Get all contacts
 * @route   GET /api/contact
 * @access  Private/Admin
 */

export const getContacts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { read, page = 1, limit = 10 } = req.query;

    let query = {};
    if (read !== undefined) {
      query = { read: read === "true" };
    }

    const pageNum = Number.parseInt(page as string, 10);
    const limitNum = Number.parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      pagination: {
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
      data: contacts,
    });
  }
);

/**
 * @desc    Get contact by ID
 * @route   GET /api/contact/:id
 * @access  Private/Admin
 */
export const getContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(
        new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
      );
    }
    // Mark contact as read if it is not already
    if (!contact.read) {
      contact.read = true;
      await contact.save();
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  }
);

/**
 * @desc    Create new contact
 * @route   POST /api/contact
 * @access  Public
 */
export const createContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email notification to admin
    // try {
    //   const emailMessage = `
    //   New contact form submission:

    //   Name: ${name}
    //   Email: ${email}
    //   Subject: ${subject}

    //   Message:
    //   ${message}
    // `;

    //   await sendEmail({
    //     email: process.env.ADMIN_EMAIL!,
    //     subject: `New Contact Form: ${subject}`,
    //     message: emailMessage,
    //   });
    // } catch (err) {
    //   console.log("Email could not be sent:", err);
    // }

    res.status(201).json({
      success: true,
      data: contact,
    });
  }
);

/**
 * @desc    Update contact
 * @route   PUT /api/contact/:id
 * @access  Private/Admin
 */
export const updateContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!contact) {
      return next(
        new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  }
);

/**
 * @desc Delete contact
 * @route DELETE /api/contact/:id
 * @access Private/Admin
 */
export const deleteContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(
        new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
      );
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  }
);

/**
 * @desc Delete contact
 * @route DELETE /api/contact/:id
 * @access Private/Admin
 */

export const toggleReadStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(
        new ErrorResponse(
          `Contact message not found with the id of ${req.params.id}`,
          404
        )
      );
    }

    contact.read = !contact.read;
    await contact.save();
  }
);
