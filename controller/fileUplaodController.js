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

// 2. Image Upload Handler=>  It is used to fetch the media or file from the client and then store/upload it onto 


// cloudinary upload function
    // file= the file we want to upload, since file should be string non-empty type, so use .tempFilePath,
    // folder is the folder in cloudinary where we want to upload file 
    const uploadFileToCloudinary=async(file,folder)=>{
        const options={folder}
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
            if(supportedTypes.includes(fileType)===false){
                return res.status(501).json({
                    success:false,
                    message:"File type not supported"
                })
            }
            
            // file fromat supported, then upload to cloudinary 

            const response=await uploadFileToCloudinary(File,"Dhuruv_Cloud")
           
            console.log(response);
            //Save entry into the database
         
            return res.status(200).json({
                success:true,
                message:"File uploaded to cloudinary"
            })
        } catch (error) {
            console.error(error);
        }
    }