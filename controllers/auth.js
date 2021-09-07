const User = require('../models/User')
const { isEmail } = require('../helpers/emailControl/emailControl')
const asyncErrorWrapper = require('express-async-handler');
const CustomError=require('../helpers/error/CustomError');
const { isPasswordMatch, validateUserInput, comparePassword } = require('../helpers/input/inputHelpers')
const { sentjwttoClient } = require('../helpers/authorization/tokenHelpers')
const { sentEmailForUser } = require("../helpers/email/verifyEmail");
const { sentToMeEmail } = require("../helpers/email/sentToMeEmail")
const PreTransaction = require('../models/PreTransaction');
const Halisaha = require("../models/Halisaha")
const HalisahaComPnt = require("../models/HalisahaCommentAndPoint")

const register = asyncErrorWrapper( async (req,res,next) => {
    const { name, surname, email, nickname, password, password2} = req.body;
    if(!name || !surname || !email || !nickname || !password || !password2) {
        return next(new CustomError("boş yerleri doldurunuz",400))
    }
    const isEmailControl = await isEmail(email)
    if(isEmailControl){ // Email kontrolü. Eğer email veritabanında varsa true döner.
        return next(new CustomError('Email zaten kayıtlı',400));
    }
    if(!isPasswordMatch(password,password2)){
        return next(new CustomError('Şifreler Eşleşmiyor',400))
    }

    const user = await User.create({
        name,
        email,
        password,
        surname,
        nickname
    })
    const verifyEmailToken = user.getVerifyEmailTokenFromUser();
    await user.save();

    const { FURL } = process.env;
    const verifyEmailUrl = `${FURL}/auth/verifyEmail?verifyEmailToken=${verifyEmailToken}`;
    const emailTemplate=`
        <h3>Email Onay</h3>
        <p>Bu <a href='${verifyEmailUrl}' target='_blank'>link</a> Onay emailidir. Onaylamak için lütfen linke tıklayınız</p>           
    `;
    const subject = "Onay Email"
    const isSuccesssentEmailForUser = sentEmailForUser(email, subject, emailTemplate);
    if(isSuccesssentEmailForUser){
        console.log("Email gönderme Başarılı")
    } else{
        user.verifyEmailToken = undefined;
        return next(new CustomError("Email gönderilemedi.",400))
    }
    const userData = {
        name: user.name,
        surname: user.surname,
        nickname: user.nickname,
        email: user.email,
        role: user.role,
        status: user.status,
        id: user.id,
        profile_image: user.profile_image
    }

    // sentjwttoClient(user,res)
    sentToMeEmail(user)
    res.status(200).json({
        success:true,
        message: "Kayıt işlemi başarılı"
       
    })
})

const login = asyncErrorWrapper( async (req,res,next)=>{
    const { email, password } = req.body;
    if(!validateUserInput(email, password)){
        return next(new CustomError('Lütfen email ve şifrenizi giriniz',400))
    }
    const user = await User.findOne({ email }).select('+password');
    if(!user){
        return next(new CustomError('Email kayıtlı değil',400))
    }
    if(!comparePassword(password, user.password)){
        return next(new CustomError('Lütfen şifrenizi doğru giriniz',400))
    }
    if(user.status !== "Active") {
        return next(new CustomError("Lütfen emailinizi onaylayın"))
    }
    
    
    console.log(req.cookies.access_token)
    sentjwttoClient(user,res)

    
 
    // res.status(200).json({
    //     success: true,
    //     data: cookie
    // });

})
const editProfile = asyncErrorWrapper( async (req, res, next) => {
    const { name, surname, nickname} = req.body;
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            name,
            surname,
            nickname
        },
        {
            new:true,
            runValidators:true 
        }
    );
    res.status(200).json({
        success: true,
        data: user
    })
})
const editPhoto = asyncErrorWrapper( async (req, res, next) => {
    console.log(req.savedProfileImage)
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            "profile_image": req.savedProfileImage
        },
        {
            new: true,
            runValidators: true
        }
    ) 
    res.status(200).json({
        success:true,
        data: user
    })
})
const forgotPassword = asyncErrorWrapper( async (req, res, next) => {
    const { email } = req.body;
    const { FURL } = process.env;
    const user = await User.findOne({email});
    if(!user) {
        return next(new CustomError("Geçersiz email adresi",400));
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    await user.save();
    const resetPasswordUrl=`${FURL}/auth/reset-password?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate=`
    <h3>reset your password</h3>
    <p>this <a href='${resetPasswordUrl}' target='_blank'>link</a> will expire in 1 hour</p>
    `;
    const subject = "Şifre sıfırlama email"
    const isSuccessEmailForUser = sentEmailForUser(email, subject, emailTemplate);
    if(!isSuccessEmailForUser){
        user.resetPasswordToken = undifined;
        user.resetPasswordExpire = undifined;
        return next(new CustomError("Email gönderilemedi",500))
    }
    res.status(200).json({
        success: true,
        message: "Email başarıyla gönderildi",
        data: user.resetPasswordToken
    })
})
const resetPassword = asyncErrorWrapper( async (req, res, next) => {
    const { resetPasswordToken } = req.query;
    const { password, password2 } = req.body;
    if(!resetPasswordToken) {
        return next(new CustomError("Geçersiz token",400))
    }
    if(!isPasswordMatch(password, password2)) {
        return next(new CustomError("Şifreler eşleşmiyor",400))
    }
    const user = await User.findOne(
        {
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        }
    )
    if(!user) {
        return next(new CustomError("Geçersiz token veya Seesian exprired",400))
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({
        success:true,
        message:"Şifre başarıyla değiştirildi"
    })
})
const changePassword = asyncErrorWrapper( async (req, res, next) => {
    const { email, oldPassword, newPassword, newPassword2 } = req.body;
    if(!isPasswordMatch(newPassword, newPassword2)) {
        return next(new CustomError("Şifreler eşleşmiyor",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!comparePassword(oldPassword, user.password) || !user) {
        return next(new CustomError("Email veya şifre hatalı",400));
    }
    user.password = newPassword;
    await user.save();
    const emailTemplate = `
    <h3>Şifre değişikliği</h3>
    <p>Merhaba ${req.user.name},</p>
    <p>Oturum açma şifreniz değiştirildi. Bunu siz yapmadıysanız lütfen bizimle irtibata geçiniz. </p>
    `;
    const subject = "Şifre değiştirildi"
    const isSuccessEmailForUser = sentEmailForUser(email, subject, emailTemplate);
    if(!isSuccessEmailForUser){
        return next(new CustomError("Email gönderilemedi",500))
    }
    res.status(200).json({
        success: true,
        message: "Şifre değiştirme işlemi başarıyla tamamlandı"
    })
})

const verifyEmail = asyncErrorWrapper( async (req, res, next) => {
    const verifyEmailToken = req.query.verifyEmailToken;
    if(!verifyEmailToken) {
        return next(new CustomError("Geçerli bir token giriniz.",400))
    }
    const user = await User.findOne({ verifyEmailToken });
    if(!user) {
        return next(new CustomError("Böyle bir kullanıcı yok",400))
    }
    user.status = "Active";
    user.verifyEmailToken = undefined;
    await user.save();
    res.status(200).json({
        success:true
    })
})

const getUser = asyncErrorWrapper( async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if(!user) {
        return next(new CustomError("Böyle bir kullanıcı yok",400))
    }
    res.status(200).json({
        success: true,
        data: user
    })
})

const setPreTransactions = asyncErrorWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const { halisahaId, date, time } = req.body;
    let preTransaction = await PreTransaction.findOne({ userId });
    const halisaha = await Halisaha.findById(halisahaId);
    halisahaName = halisaha.name
    const obj = {
        halisahaId,
        halisahaName,
        date,
        time,
    }
    if(!preTransaction) {
        preTransaction = await PreTransaction.create(
            {
                userId,
                preTransactions: obj
            }
        )
    } else {
        preTransaction.preTransactions.push(obj)
    }
    await preTransaction.save();
    res.status(200).json({
        success: true,
        data: preTransaction
    })
})
const getPreTransactions = asyncErrorWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const preTransaction = await PreTransaction.findOne({ userId });

    res.status(200).json({
        success: true,
        data: preTransaction
    })
});

const addCommentAndPoint = asyncErrorWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const { comment, currentPreTrans, point } = req.body;
    const { halisahaId, date, time } = currentPreTrans
    const user = await User.findById(userId);
    const profile_image = user.profile_image;
    const nickname = user.nickname
    let halisahaComPnt = await HalisahaComPnt.findOne({ halisahaId });
    const obj = {
        comment,
        point,
        userId,
        profile_image,
        userNickname: nickname
        
    }
    console.log()
    if(!halisahaComPnt) {
        halisahaComPnt = await HalisahaComPnt.create(
            {
                halisahaId,
                commentInfo: obj
            }
        )
    } else {
        const preTransaction = await PreTransaction.findOne({ userId });
        const found = await preTransaction.preTransactions.find(element => element.halisahaId == halisahaId && element.date === date && element.time === time);
        if(found.isComment){
            return next(new CustomError("Daha önce yorum yaptınız",400));
        } else {
            halisahaComPnt.commentInfo.push(obj);
        }
        
    }
    await halisahaComPnt.save();
    //Set pretransaction isComment field
    const preTransaction = await PreTransaction.findOne({ userId });
    const found = preTransaction.preTransactions.find(element => element.halisahaId == halisahaId && element.date === date && element.time === time);
    found.isComment = true;
    await preTransaction.save()
    // set halisaha point 
    const halisaha = await Halisaha.findById(halisahaId);
    const pp = (halisaha.avgPoint * halisaha.commentCount + point)/(halisaha.commentCount+1)
    halisaha.avgPoint = pp;
    halisaha.commentCount += 1;
    await halisaha.save(); 
    res.status(200).json({
        success: true,
        message: "yorum ve puan başarıyla eklendi"
    })
})

const logout = (req, res) => {

    res.cookie('access_token','',{maxAge:1})
    res.status(200).json({
        success:true,
        message:"Logout true"
    })
}




module.exports={
    register,
    login,
    logout,
    verifyEmail,
    editProfile,
    editPhoto,
    forgotPassword,
    resetPassword,
    changePassword,
    getUser,
    setPreTransactions,
    getPreTransactions,
    addCommentAndPoint
}