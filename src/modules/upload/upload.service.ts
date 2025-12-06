// backend/src/modules/upload/upload.service.ts
import cloudinary from '../../config/cloudinary';
import { Readable } from 'stream';

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string = 'localguide'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
        transformation: [
          { width: 1200, height: 800, crop: 'limit' },
          { quality: 'auto:good' },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    );

    // Convert buffer to stream and pipe to Cloudinary
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);
    bufferStream.pipe(uploadStream);
  });
};

export const uploadMultipleToCloudinary = async (
  files: Express.Multer.File[],
  folder: string = 'localguide'
): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadToCloudinary(file, folder));
  return await Promise.all(uploadPromises);
};

export const deleteFromCloudinary = async (imageUrl: string): Promise<void> => {
  // Extract public_id from Cloudinary URL
  const parts = imageUrl.split('/');
  const filename = parts[parts.length - 1];
  const publicId = `localguide/${filename.split('.')[0]}`;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};