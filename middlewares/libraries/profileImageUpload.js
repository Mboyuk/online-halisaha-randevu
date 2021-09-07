const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        const rootDir = path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/public/uploads"));
    },
    filename: function(req,file,cb){
        console.log(file.originalname)
        const fName = file.originalname.split(".")[0];
        console.log(fName)
        const extension = file.mimetype.split("/")[1];
        req.savedProfileImage = "profileImage_"+req.user.id+"."+extension;//"_"+fName+
        cb(null,req.savedProfileImage);
    }
});

const fileFilter=(req,file,cb)=>{
    let allowedMimeTypes=["image/jpg","image/gif","image/jpeg","image/png"];
    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(new CustomError("Lütfen geçerli bir resim giriniz.",400),false);

    }
    return cb(null,true);
};
const profileImageUpload=multer({storage,fileFilter});
module.exports=profileImageUpload;