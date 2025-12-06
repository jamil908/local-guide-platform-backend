// backend/src/modules/upload/upload.controller.ts
import { Request, Response, NextFunction } from 'express';
import { uploadToCloudinary, uploadMultipleToCloudinary } from './upload.service';
import { successResponse } from '../../utils/resoponse';

export const uploadSingleImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const imageUrl = await uploadToCloudinary(req.file);

    res.status(200).json(
      successResponse({ url: imageUrl }, 'Image uploaded successfully')
    );
  } catch (error: any) {
    next(error);
  }
};

export const uploadMultipleImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
      });
    }

    const imageUrls = await uploadMultipleToCloudinary(req.files);

    res.status(200).json(
      successResponse({ urls: imageUrls }, 'Images uploaded successfully')
    );
  } catch (error: any) {
    next(error);
  }
};