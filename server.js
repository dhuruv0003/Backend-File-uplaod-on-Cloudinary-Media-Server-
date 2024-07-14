// app create 
const express=require("express")
const app=express();

//PORT
require('dotenv').config();
const PORT=process.env.PORT || 8000

// Using Middleware 
app.use(express.json());

const cookieParser=require('cookie-parser')
app.use(cookieParser())

//Note to upload file on cloudinary we user cloudinary package, but to upload the file only on the server, we user express-fileuplaod media server.
// we can add tmp file by setting it true, or leave it empty 
const fileUpload=require('express-fileupload')
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

// app.use(fileUpload());

//Db connect
require('./config/database').dbConnect();

//Connect to cloud using cloudinary
const cloudinary=require('./config/cloudinary')
cloudinary.cloudinaryConnect();


// API route Mount 
const route=require('./routes/fileRoutes')
app.use("/api/v1/upload",route)

// Activate server 
app.listen(PORT,()=>{
    console.log(`Server started successfully at http://localhost:${PORT}`);
})

