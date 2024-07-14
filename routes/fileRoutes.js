const express=require('express')

const router=express.Router();

const {imageUpload,videoUpload,imageReducerUpload, localFileUpload}=require('../controller/fileUplaodController')

// API ROUTES

router.post('/imageUpload',imageUpload)
router.post('/videoUpload',videoUpload)
router.post('/imageReduceUpload',imageReducerUpload)



router.post('/localFileUpload',localFileUpload)

module.exports=router