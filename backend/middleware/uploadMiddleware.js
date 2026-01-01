const multer = require("multer");
const path = require("path");
const fs = require("fs");
const os = require("os");

// Use /tmp directory for Vercel (serverless functions support /tmp)
// For local dev, use uploads folder
const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const uploadDir = isVercel 
  ? path.join(os.tmpdir(), "uploads") 
  : path.join(__dirname, "../uploads");

// Create directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

//FIle filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg , .jpg , .png formats are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
