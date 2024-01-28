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

const avatarStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "../public/images/avatar"));
  },
  filename: (req, file, cb) => {
    const { username } = req.body;
    cb(null, `avatar_${username}-${Date.now()}-${file.originalname}`);
  },
});

const paymentStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "../public/images/payments"));
  },
  filename: (req, file, cb) => {
    const { username } = req.body;
    cb(null, `payment_${username}-${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[1];
  if (
    fileType === "png" ||
    fileType === "jpg" ||
    fileType === "jpeg" 
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

const uploadAvatarFile = multer({
  storage: avatarStorage,
  fileFilter,
  limits,
}).single("avatar");

const uploadPaymentFile = multer({
  storage: paymentStorage,
  fileFilter,
  limits,
}).single("payment");

module.exports = {
  uploadProductFile,
  uploadAvatarFile,
  uploadPaymentFile,
};
