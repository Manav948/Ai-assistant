import cloudinaryConfig from "../config/cloudinary.js";

export const uploadController = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    const imageUrl = await cloudinaryConfig(file.buffer);
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Upload error:", error.message);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};