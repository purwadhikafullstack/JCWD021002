const path = require("path");
const multer = require("multer");



const productStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    console.log("Multer Received Data:", req.body);
    cb(null, path.join(__dirname, "../public/images/products"));
  },
  filename: (req, file, cb) => {
    const { name } = req.body;
    console.log("ini di middleware", name);
    console.log("ini di middleware", req.body);
    cb(null, `product_${name}-${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[1];
  if (
    fileType === "png" ||
    fileType === "jpg" ||
    fileType === "jpeg" ||
    fileType === "gif"
  ) {
    cb(null, true);
  } else {
    cb("File type not allowed", false);
  }
};

const limits = {
  fileSize: 1024 * 1024,
};


const uploadProductFile = multer({
  storage: productStorage,
  fileFilter,
  limits,
}).array("images");

module.exports = {
  uploadProductFile,
};
