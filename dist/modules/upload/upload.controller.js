"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleImages = exports.uploadSingleImage = void 0;
const upload_service_1 = require("./upload.service");
const resoponse_1 = require("../../utils/resoponse");
const uploadSingleImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }
        const imageUrl = await (0, upload_service_1.uploadToCloudinary)(req.file);
        res.status(200).json((0, resoponse_1.successResponse)({ url: imageUrl }, 'Image uploaded successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.uploadSingleImage = uploadSingleImage;
const uploadMultipleImages = async (req, res, next) => {
    try {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded',
            });
        }
        const imageUrls = await (0, upload_service_1.uploadMultipleToCloudinary)(req.files);
        res.status(200).json((0, resoponse_1.successResponse)({ urls: imageUrls }, 'Images uploaded successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.uploadMultipleImages = uploadMultipleImages;
