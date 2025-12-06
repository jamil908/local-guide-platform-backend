// backend/src/config/multer.ts
import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.memoryStorage(); // Store files in memory for Cloudinary upload

// File filter
const fileFilter = (req: any, file: any, cb: any) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// Multer upload configuration
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: fileFilter,
});

// Multiple file upload configuration
export const uploadMultiple = upload.array('images', 10); // Max 10 images
export const uploadSingle = upload.single('image');