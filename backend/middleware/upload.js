import path from "path";
import multer from "multer";

const Upload_Folder = "uploads/";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, Upload_Folder);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
            file.originalname
                .replace(fileExt, "")
                .toLocaleLowerCase()
                .split(" ")
                .join("-") +
            "-" +
            Date.now();
        cb(null, fileName + fileExt);
    },
});
var upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1000000,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});

export { upload };