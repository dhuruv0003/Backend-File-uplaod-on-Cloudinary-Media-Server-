const express=require('express')

const router=express.Router();

const {imageUpload,videoUpload,imageReducerUpload, localFileUpload}=require('../controller/fileUplaodController')

// API ROUTES

router.post('/localFileUpload',localFileUpload)
router.post('/imageUpload',imageUpload)
router.post('/videoUpload',videoUpload)
router.post('/imageReduceUpload',imageReducerUpload)




module.exports=router