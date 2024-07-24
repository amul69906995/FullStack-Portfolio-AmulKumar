const multer  = require('multer')
const path=require('path');
const appError = require('../error/appError');
const currentDir = __dirname;
const parentDir = path.join(currentDir, '..');


const fileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  // Add the mimetypes you want to allow
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF file types are allowed.'));
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(parentDir,'/uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
    }
  })
  
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize:2* 1024 * 1024 // 2 MB size limit
    }
  })
  module.exports=upload;