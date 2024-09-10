const multer = require("multer");
const path =require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathName = "public/uploads"
      cb(null, pathName)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname) //file extension name
        const name = path.basename(file.originalname, ext);
        const fixNameSpace = name.replace(/\s+/g, "_");
        const filename = "ecommerce_" + fixNameSpace+"_" + Date.now() + ext
      
      cb(null, filename )
    }
  });
  
  const upload = multer({ 
    storage: storage 
  });

  module.exports = upload;