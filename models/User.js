const mongoose = require('mongoose');
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto=require("crypto");

const Schema = mongoose.Schema;


const UserSchema = new Schema({

    name:{
        type:String,
        required:[true,"isminizi giriniz"], 
    },
    surname:{
        type:String,
        required:[true,"soyisim giriniz"],
    },
    nickname:{
        type:String,
        required:[true,"kullanıcı adı giriniz"],
    },
    role:{
        type:String,
        default:"user",
        enum:["user","manager","admin"]
    },

    password:{
        type:String,
        required:[true,"sifre giriniz"],
        select : false,
        minlength : 6,
    },
    email:{
        type:String,
        required:true
    },
    profile_image : {
        type : String,
        default : "default.jpg"
    },
    resetPasswordToken : {
        type:String
    },
    resetPasswordExpire:{
        type:Date
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    verifyEmailToken:{
        type:String
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }


})

UserSchema.methods.generateJwtFromUser=function(){
    const { JWT_SECRET_KEY, JWT_EXPIRE }=process.env;
    const payload={
        id:this.id,
        name:this.name,
        email:this.email,   
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    });
    return token;
};

UserSchema.methods.getVerifyEmailTokenFromUser = function() {
    const randomHexString = crypto.randomBytes(15).toString("hex");
    const verifyEmailToken = crypto.createHash("SHA256").update(randomHexString).digest("hex");
    this.verifyEmailToken = verifyEmailToken;
    console.log(verifyEmailToken)
    return verifyEmailToken;
}

UserSchema.methods.getResetPasswordTokenFromUser = function() {
    const randomHexString = crypto.randomBytes(15).toString("hex");
    const {RESET_PASSWORD_EXPIRE}=process.env;
    const resetPasswordToken = crypto.createHash("SHA256").update(randomHexString).digest("hex");
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire=Date.now()+360000000;
    console.log(resetPasswordToken)
    return resetPasswordToken;
}

UserSchema.pre("save",function(next){
    if(!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) next(err);
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) next(err);
            this.password=hash;
            next();
        });
    })

})

module.exports = mongoose.model("User",UserSchema);