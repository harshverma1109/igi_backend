const Profile = require('../../models/user');

exports.update_profile =async (req,res)=>{

       let data = await Profile.updateOne( 
           { email: req.token.user.email },  
           { profile_image: 'uploads/avatar/'+req.file.filename,
           about_me:req.body.about_me
           });
    console.log(data);
    if(!data) return res.status(401).json({msg:"No user found"});
    if(data){
        if(data.modifiedCount===1)return res.status(200).json({msg:"Data updated Successfully"});
    }
}
exports.get_user =async (req,res)=>{
    let data = await Profile.findOne({ email:req.token.user.email}).select({password:0}).exec();
    // console.log(data);
    res.status(200).send(data);
}