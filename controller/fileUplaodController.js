const FileUp=require('../models/fileModel')

//   LocalFileUpload handler:= It is used to fetch the media or file from the client and then store/upload it onto the path of the server 

exports.localFileUpload=async(req,res)=>{
    try {
        //Fetch file 
        // Note in Postman post request in body-> from-data, give Key as file, sotheat we fetch file data from req.files.file
        const File=req.files.file
        console.log("File is",File);

        //kis path pr file ko store karna chahte ho
        // __dirname replresent current directory 

        // in path we add current directory name, a route /files/ and current date and at last extension
        
        // To add extension of file we split file name on the basis of dot and return the posrtion after the daot

        let path=__dirname + "/files/" + Date.now()+ `.${File.name.split('.')[1]}`;
        console.log(" path ",path);

        // req.files.file.mv: A function to move the file elsewhere onthe path of your server. Can take a callback or return a promise, say any error

        File.mv(path,(err)=>{
            console.log(err);
        })

        // const fileUpload=await FileUp.create({"name":Date.now()+`.${File.name.split('.')[1]}`})

       return res.json({
            success:true,
            // fileUpload,
            message:'Local File Upload Successfully'
        })

    } catch (error) {
        console.log(error);
    }
}