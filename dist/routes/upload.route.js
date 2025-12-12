"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post("/", upload.single("file"), async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: "No file uploaded" });
        const streamUpload = () => new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({ folder: "listings" }, (error, result) => {
                if (result)
                    resolve({ url: result.secure_url });
                else
                    reject(error);
            });
            stream.end(req.file.buffer);
        });
        const result = await streamUpload();
        res.json({ url: result.url });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
