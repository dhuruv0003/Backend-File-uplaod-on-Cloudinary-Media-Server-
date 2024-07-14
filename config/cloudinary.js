const cloudinary=require('cloudinary').v2

require('dotenv').config();

exports.cloudinaryConnect=()=>{
    try {
        //To establish connection of server with cloudinary we make use of config() funciton of cloudinary  method
        //Format=>  cloudinary.config({ 
        //              cloud_name: --, 
        //              api_key: --, 
        //              api_secret: --
        //           }); 

        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })


    } catch (error) {
     console.error(error);   
    }
}