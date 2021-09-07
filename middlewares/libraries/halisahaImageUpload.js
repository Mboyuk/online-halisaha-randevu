const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");

const storage = multer.diskStorage({ 
    destination: function(req, file, cb){
        const rootDir = path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/public/halisahaResimler"));
    },
    filename: function(req, file, cb) {
 
        const extension = file.mimetype.split("/")[1];
        
        const name = file.originalname.split(".")[0];
       // const imageName = "halisaha_image_"+req.user.id+"_"+name+"."+extension;
     

        req.savedHalisahaImage = "halisaha_image_"+req.user.id+"_"+name+"."+extension;
        cb(null,req.savedHalisahaImage);
 
        
    }
    
});



const fileFilter = (req,file,cb)=>{
    let allowedMimeTypes=["image/jpg","image/gif","image/jpeg","image/png"];
    if(!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new CustomError("please provide a valid image file ",400),false);
    }
    return cb(null,true);
};

const halisahaImageUpload=multer({storage,fileFilter});
module.exports=halisahaImageUpload;