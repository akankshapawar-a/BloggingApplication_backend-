import {v2 as cloudinary} from 'cloudinary';
 import fs from 'fs'         
cloudinary.config({ 
  cloud_name: 'dhbjv1rvy', 
  api_key: '236438645471779', 
  api_secret: '4YFV9kD_-mGlQrdI9MECLmSg4hA' 
});
          
// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME, 
//   api_key:process.env.CLOUD_API_KEY, 
//   api_secret:process.env.CLOUD_API_SECRET
// });

const uploadOnCloudnary=async(localFilePath)=>{

    try {
        if(!localFilePath) return null
        //upload the file on cloudnary
     const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file as uploaded sucessfully
console.log("uploded Successfully");
return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);  //remove the locally save tempory  file when operation get failed
    }
}


export  default uploadOnCloudnary
