import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file buffer to Cloudinary via upload_stream.
 * Works with multer memoryStorage (no temp files on disk).
 * @param {Buffer} buffer - The file buffer from req.file.buffer
 * @param {string} [folder='voxa-avatars'] - Cloudinary folder
 * @returns {Promise<string>} Secure URL of the uploaded image
 */
const cloudinaryConfig = (buffer, folder = 'voxa-avatars') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error.message);
          return reject(new Error('Failed to upload image to Cloudinary.'));
        }
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

export default cloudinaryConfig;