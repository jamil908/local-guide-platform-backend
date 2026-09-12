"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleImages = exports.uploadSingleImage = void 0;
const upload_service_1 = require("./upload.service");
const uploadSingleImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file uploaded',
            });
        }
        const imageUrl = await (0, upload_service_1.uploadToCloudinary)(req.file);
        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully!',
            data: { url: imageUrl },
        });
    }
    catch (error) {
        console.error('🔥 Controller Exception Log:', error);
        next(error);
    }
};
exports.uploadSingleImage = uploadSingleImage;
const uploadMultipleImages = async (req, res, next) => {
    try {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No image files uploaded',
            });
        }
        const imageUrls = await (0, upload_service_1.uploadMultipleToCloudinary)(req.files);
        return res.status(200).json({
            success: true,
            message: 'Images uploaded successfully!',
            data: { urls: imageUrls },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadMultipleImages = uploadMultipleImages;
