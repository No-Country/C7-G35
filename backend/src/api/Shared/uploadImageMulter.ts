import multer from 'multer';

const storageMulter = multer.diskStorage({
  destination: './temp-files',
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const fileName = `${file.fieldname}-${file.originalname.split('.')[0]}-${Date.now()}.${ext}`;
    cb(null, fileName);
  }
});

export const uploadImageMiddelware = multer({ storage: storageMulter });

export class UploadImageFail extends Error {
  constructor(message: string) {
    super(`Upload Image Fail: ${message}`);
  }
}
