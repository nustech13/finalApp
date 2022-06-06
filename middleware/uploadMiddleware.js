import multer from 'multer';

const MAX_SIZE_FILE = 5 * 1024 * 1024;
const upload = multer({
  limits: {
    fileSize: MAX_SIZE_FILE,
  },
});

export default upload;
