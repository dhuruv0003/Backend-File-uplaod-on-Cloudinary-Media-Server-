const fileModel = require('../models/fileModel');


const cloudinary=require('cloudinary').v2;

// 1. LocalFileUpload handler:= It is used to fetch the media or file from the client and then store/upload it onto the path of the server 

    exports.localFileUpload=async(req,res)=>{
        try {
            //Fetch file 
            // Note in Postman post request in body-> from-data, give Key as file, sotheat we fetch file data from req.files.file
            const File=req.files.file
            console.log("File is",File);

            //kis path pr file ko store karna chahte ho
            // __dirname replresent current directory 

            // in path we add current directory name + at route /files/ + current date + at last extension
            
            // To add extension of file we split file name on the basis of dot('.') and return the posrtion after the daot

            let path=__dirname + "/files/" + Date.now()+ `.${File.name.split('.')[1]}`;
            console.log(" path ",path);

            // req.files.file.mv: A function to move the file elsewhere onthe path of your server. Can take a callback or return a promise, say any error

            File.mv(path,(err)=>{
                console.log(err);
            })

            // const fileUpload=await FileUp.create({"name":Date.now()+`.${File.name.split('.')[1]}`})

        return res.status(200).json({
                success:true,
                // fileUpload,
                message:'Local File Upload Successfully'
            })

        } catch (error) {
            console.log(error);
        }
    }

// 2. Image Upload Handler=>  It is used to fetch the media or file from the client and then store/upload it onto cloudinary 


// cloudinary upload function
    // file= the file we want to upload, since file should be string non-empty type, so use .tempFilePath,
    // folder is the folder in cloudinary where we want to upload file 
    const uploadFileToCloudinary=async(file,folder)=>{
        const options={folder}
        //Note=> we need the destination folder to be of auto type, so that it can keep any type of resource
        options.resource_type="auto"
        return await cloudinary.uploader.upload(file.tempFilePath,options)
    }

    exports.imageUpload=async (req,res)=>{
        try {

            // data fetch 
            const {name,tags,email}=req.body;
            console.log(name,tags,email);
            
            const File=req.files.imageFile;
            console.log(File);

            // Validations

            const supportedTypes=["jpg","jpeg","png"];

            const fileType=File.name.split('.')[1].toLowerCase();
            // aggar supported types im given file type present nhi h so return faiilure response  
            if(!supportedTypes.includes(fileType)){
                return res.status(501).json({
                    success:false,
                    message:"File type not supported"
                })
            }
            
            // file fromat supported, then upload to cloudinary 

            const response=await uploadFileToCloudinary(File,"Dhuruv_Cloud")
           
           
            console.log(response);
            //Save entry into the database
         
            const dbEntry=await fileModel.create({
                name,
                imageUrl:response.secure_url,
                email,
                tags
            })

            return res.status(200).json({
                success:true,
                imageUrl:response.secure_url,
                message:"File uploaded to cloudinary",
                dbEntry
            })
        
        } catch (error) {
            console.error(error);
        }
    }


//Video Upload Handler =>  It is used to fetch the video file from the client and then store/upload it onto cloudinary 

    exports.videoUpload=async(req,res)=>{
       try {
         // Fetch data 
         const {name,tags,email}=req.body;

         //Fetch File
         const File=req.files.videoFile;
 
         //Validations
 
         const supportedTypes=["mp4","mov","gif"]
         const fileType=File.name.split('.')[1].toLowerCase();
 
         if(!supportedTypes.includes(fileType)){
             return res.status(404).json({
                 success:false,
                 message:"File Format Not Supported"
             })
         }

         // In case file fromat is supporte
 
         const response=await uploadFileToCloudinary(File,"Dhuruv_Cloud");
         console.log(response);
 
         
         const dbEntry=await fileModel.create({
             name,
             imageUrl:response.secure_url,
             email,
             tags
         })

         return res.status(200).json({
            success:true,
            message:"File uploaded Successfully"
        })
       }
        catch (error) {
        console.error(error);
       }
    }