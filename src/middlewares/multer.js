import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure 'public' directory exists
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// Set up storage to save files in the 'public' folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, publicDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Multer configuration
export const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});
