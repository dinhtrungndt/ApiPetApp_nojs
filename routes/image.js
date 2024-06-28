var express = require("express");
var router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const imageModels = require("../models/image");

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: "daxdqpvzv",
  api_key: "125864234945544",
  api_secret: "b4gk4LPCkr9sTJ4fw3ys4IIPgoQ",
  secure: true,
  cdn_subdomain: true,
  chunk_size: 6000000,
  timeout: 60000,
  concurrency: 4,
});

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB max file size
    },
    fileFilter: function (req, file, cb) {
      if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image and video files are allowed!"), false);
      }
    },
  });

// Lấy danh sách các img
// http://localhost:3000/img
router.get("/", async (req, res) => {
  const data = await imageModels.find();
  res.json(data);
});

// Upload file lên img
// http://localhost:3000/image/upload-img
router.post("/upload-img", upload.array("img"), async (req, res, next) => {
    try {
      const { files } = req;
      if (!files || files.length === 0) {
        return res.json({ status: 0, message: "No files uploaded" });
      }
  
      const urls = [];
  
      for (const file of files) {
        try {
          let result;
  
          if (file.mimetype.startsWith("image/")) {
            result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
          } else if (file.mimetype.startsWith("video/")) {
            result = await cloudinary.uploader.upload(file.path, { resource_type: "video" });
          }
  
          if (result && result.secure_url) {
            urls.push(result.secure_url);
          }
        } catch (error) {
          console.log("Lỗi uploading file lên Cloudinary:", error);
        }
      }
  
      return res.json({ status: 1, urls });
    } catch (error) {
      console.log("Upload media Lỗiiiiiii: ", error);
      return res.json({ status: 0, message: "Looix uploading files lênnn Cloudinary" });
    }
  });

// http://localhost:3000/image/add-img/:idpet
router.post("/add-img/:idpet", async (req, res) => {
    const { idpet } = req.params;
    const { img} = req.body;
  
    try {
      const img1 = new imageModels({ img,  idpet });
      await img1.save();
      res.json(img1);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 0, message: "Lỗi" });
    }
  });
  

module.exports = router;