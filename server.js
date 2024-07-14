const express=require("express")

const app=express();

app.use(express.json());

require('dotenv').config();

const cookieParser=require('cookie-parser')
app.use(cookieParser)

const PORT=process.env.PORT || 4000

const route=require('./routes/fileRoutes')
app.use("/api/v1",route)

app.listen(PORT,()=>{
    console.log(`Server started successfully at http://localhost:${PORT}`);
})

require('./config/database').dbConnect();