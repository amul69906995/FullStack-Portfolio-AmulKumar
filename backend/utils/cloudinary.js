const cloudinary = require('cloudinary').v2;
const fs=require('fs').promises
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
  });

  const uploadImgCloudinary=async(filePath)=>{
   // console.log(filePath)
    try{
    const result= await cloudinary.uploader.upload(filePath,{folder:'portfolio'})
    console.log(result)
        await fs.unlink(filePath);
        console.log('File deleted successfully');
        return result;
    }
    catch (error){
        console.error('Error uploading to Cloudinary:', error);
        throw new Error(error.message||'Failed to upload image',400);
    }
  }
const deleteImgCloudinary=async (public_id)=>{
  return cloudinary.uploader.destroy(public_id,{folder:'portfolio'})
}
  module.exports={uploadImgCloudinary,deleteImgCloudinary};