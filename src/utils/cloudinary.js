import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";

export const CloudinaryUpload = async (image) => {
  if (!image) return "";
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imageURL = res.data.secure_url;
    return imageURL;
  } catch (error) {
    throw error;
  }
};
