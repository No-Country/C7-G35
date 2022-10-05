import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});

type imageUrl = string;
export async function uploadImageCloud(filePaht: string): Promise<imageUrl> {
  const options = {
    folder: 'pets/',
    transformation: { crop: 'limit', width: 800, height: 800 }
  };
  const result = await cloudinary.uploader.upload(filePaht, options);
  removeImageLocal(filePaht);
  console.log(result, 'result clouddd');
  return result.secure_url;
}

export async function removeImageLocal(filePaht: string): Promise<void> {
  fs.unlink(filePaht, err => {
    if (err) console.error(err);
  });
}

export async function deleteImageInCloud(imageUrl: imageUrl): Promise<void> {
  const urlDiv = imageUrl.split('/');
  const imageName = urlDiv[urlDiv.length - 1].split('.')[0];
  const imagePublicId = urlDiv[urlDiv.length - 2] + '/' + imageName;

  await cloudinary.uploader.destroy(imagePublicId);
}
