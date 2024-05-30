import { v2 } from 'cloudinary'
import fs from 'fs'

// Configuration
v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFildPath) => {
    try {
        if (!localFildPath) {
            console.log(localFildPath)
            return null
        }
        
        const responce = await v2.uploader.upload(localFildPath, {
            resource_type: 'auto',
        })
        //file has been uploaded
        
        fs.unlinkSync(localFildPath)
        return responce;
    } catch (error) {
        fs.unlinkSync(localFildPath)  //remove the localy saved temporary file 
        return null;
    }
}

export { uploadOnCloudinary }
    
    