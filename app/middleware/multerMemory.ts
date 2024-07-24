import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage()

const multerInstance = multer({ storage });
export {
    multerInstance as multerMemory,
}