// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/temp')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })
  
//  const upload = multer({ 
//    storage,
//  })

//  export default upload;




import multer from "multer";

// Multer configuration for handling both images and videos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

// Multer upload middleware instance
const upload = multer({ 
  storage,
  limits:{fileSize:1024 *1024 *5},
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type.'));
    }
  }
});

export default upload;
