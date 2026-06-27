import multer from "multer";

/**
 * Use memoryStorage so uploaded files are kept in RAM as a Buffer.
 * This is required for cloud platforms like Render where the filesystem
 * is ephemeral — files written to disk are lost on every restart/redeploy.
 * Cloudinary can accept a buffer directly via upload_stream.
 */
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  },
});

export default upload;