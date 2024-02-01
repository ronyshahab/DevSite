const cloudinary = require("cloudinary").v2;
const config = require("config");
const fs = require("fs");
cloudinary.config({
  cloud_name: config.get("CLOUDNAME"),
  api_key: config.get("APIKEY"),
  api_secret: config.get("APISECRET"),
});

const uploadAImageOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const upload = await cloudinary.uploader.upload(localFilePath);
    // const upload = await cloudinary.uploader.upload(localFilePath, {
    //   resource_type: "image",
    // });

    if (upload) {
      fs.unlinkSync(localFilePath);
      return upload.secure_url;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};

module.exports = { cloudinary, uploadAImageOnCloudinary };
