"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadMultipleToCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const stream_1 = require("stream");
const uploadToCloudinary = async (file, folder = 'uploads') => {
    console.log('🔍 [STEP 1] Starting Stream Upload for file:', file.originalname);
    return new Promise((resolve, reject) => {
        // 1. Cloudinary upload stream তৈরি
        const uploadStream = cloudinary_1.default.uploader.upload_stream({
            folder,
            resource_type: 'image',
            timeout: 60000, // 60 seconds timeout limit
        }, (error, result) => {
            if (error) {
                console.error('🔥 [STREAM ERROR]:', error);
                return reject(error);
            }
            console.log('✅ [SUCCESS] Uploaded URL:', result?.secure_url);
            resolve(result.secure_url);
        });
        // 2. Buffer কে Stream-এ রূপান্তর করে Pipe করা
        const stream = stream_1.Readable.from(file.buffer);
        stream.pipe(uploadStream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const uploadMultipleToCloudinary = async (files, folder = 'uploads') => {
    const uploadPromises = files.map((file) => (0, exports.uploadToCloudinary)(file, folder));
    return await Promise.all(uploadPromises);
};
exports.uploadMultipleToCloudinary = uploadMultipleToCloudinary;
const deleteFromCloudinary = async (imageUrl) => {
    // Extract public_id from the full Cloudinary URL
    // e.g. https://res.cloudinary.com/<cloud>/image/upload/v123456/uploads/abc123.jpg
    // → public_id = "uploads/abc123"
    const parts = imageUrl.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) {
        console.error('Could not extract public_id from URL:', imageUrl);
        return;
    }
    // skip the version segment (v123456) if present
    const afterUpload = parts.slice(uploadIndex + 1);
    if (afterUpload[0]?.startsWith('v') && /^\d+$/.test(afterUpload[0].slice(1))) {
        afterUpload.shift();
    }
    const publicIdWithExt = afterUpload.join('/');
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ''); // strip extension
    try {
        await cloudinary_1.default.uploader.destroy(publicId);
    }
    catch (error) {
        console.error('Error deleting from Cloudinary:', error);
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
