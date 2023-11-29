const express = require('express');
const router = express.Router();
const {update_profile,get_user} = require('../controllers/profile');
const multer  = require('multer')
const path=require('path')
const {verifyToken}=require('../../verify/verifyToken')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+path.extname(file.originalname))
      //date.now() gives you the exact date along with time in string and path.extname(file.orignalname) take .png extension from the
      //orignal file name.
    }
  })
  
  const upload = multer({ storage: storage })

router.put('/update-profile',verifyToken,upload.single('profile_image'),update_profile);
router.get('/user-data',verifyToken,get_user);

module.exports=router;