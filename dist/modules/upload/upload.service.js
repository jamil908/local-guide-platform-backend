"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadMultipleToCloudinary = exports.uploadToCloudinary = void 0;
// backend/src/modules/upload/upload.service.ts
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const stream_1 = require("stream");
const uploadToCloudinary = async (file, folder = 'localguide') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.default.uploader.upload_stream({
            folder: folder,
            resource_type: 'auto',
            transformation: [
                { width: 1200, height: 800, crop: 'limit' },
                { quality: 'auto:good' },
            ],
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result.secure_url);
            }
        });
        // Convert buffer to stream and pipe to Cloudinary
        const bufferStream = new stream_1.Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null);
        bufferStream.pipe(uploadStream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const uploadMultipleToCloudinary = async (files, folder = 'localguide') => {
    const uploadPromises = files.map((file) => (0, exports.uploadToCloudinary)(file, folder));
    return await Promise.all(uploadPromises);
};
exports.uploadMultipleToCloudinary = uploadMultipleToCloudinary;
const deleteFromCloudinary = async (imageUrl) => {
    // Extract public_id from Cloudinary URL
    const parts = imageUrl.split('/');
    const filename = parts[parts.length - 1];
    const publicId = `localguide/${filename.split('.')[0]}`;
    try {
        await cloudinary_1.default.uploader.destroy(publicId);
    }
    catch (error) {
        console.error('Error deleting from Cloudinary:', error);
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
