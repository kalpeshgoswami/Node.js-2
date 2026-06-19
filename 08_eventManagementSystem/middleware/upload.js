// import multer from "multer";
// import fs from "fs";
// import path from "path";

// const storage = multer.diskStorage({

//   destination: (req, file, cb) => {
//     let folderName = "uploads/";


//     if (file.fieldname === "eventImage") {
//       folderName += "eventImage"
//     } else if (file.fieldname === "eventPoster") {
//       folderName += "eventPoster"
//     } else if (file.fieldname === "eventBanner") {
//       folderName += "eventBanner"
//     } else if (file.fieldname === "eventSpeaker") {
//       folderName += "eventSpeaker"
//     } else if (file.fieldname === "eventDocuments") {
//       folderName += "eventDocuments"
//     } else {
//       folderName = "other"
//     }
//     fs.mkdirSync(folderName, {
//       recursive: true
//     });

//     cb(null, folderName)
//   },

//   filename: (req, file, cb) => {

//     const uniqueName =
//       file.fieldname + "-" + Date.now() + "-" + file.originalname;

//     cb(null, uniqueName);
//   },

// });

// const fileFilter = (req, file, cb) => {

//   const ImageType = [
//     "image/jpg",
//     "image/jpeg",
//     "image/png"
//   ];

//   const documentTypes = [
//     "application/pdf"
//   ]

//   if (file.fieldname === "eventDocuments") {
//     if (documentTypes.includes(file.mimetype)) {
//       return cb(null, true);
//     }
//     return cb(new Error("only jpg, jpeg, png is allowed"));
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 20 * 1024 * 1024
//   }
// });

// export default upload;



import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderName = "upload/";

    if (file.fieldname === "eventImage") {
      folderName += "eventImage";
    } else if (file.fieldname === "eventPoster") {
      folderName += "eventPoster";
    } else if (file.fieldname === "eventBanner") {
      folderName += "eventBanner";
    } else if (file.fieldname === "eventSpeaker") {
      folderName += "eventSpeaker";
    } else if (file.fieldname === "eventDocuments") {
      folderName += "eventDocuments";
    } else {
      folderName += "other";
    }

    fs.mkdirSync(folderName, { recursive: true });

    cb(null, folderName);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageTypes = ["image/jpg", "image/jpeg", "image/png"];
  const documentTypes = ["application/pdf"];

  if (file.fieldname === "eventDocuments") {
    if (documentTypes.includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error("Only PDF files are allowed"), false);
  }

  if (
    file.fieldname === "eventImage" ||
    file.fieldname === "eventPoster" ||
    file.fieldname === "eventBanner" ||
    file.fieldname === "eventSpeaker"
  ) {
    if (imageTypes.includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error("Only JPG, JPEG and PNG files are allowed"), false);
  }

  return cb(new Error("Invalid file field"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, 
  },
});

export default upload;