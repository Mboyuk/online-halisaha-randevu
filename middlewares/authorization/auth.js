const jwt = require("jsonwebtoken")
const asyncErrorWrapper=require("express-async-handler");
const CustomError = require("../../helpers/error/CustomError");
const { isTokenIncluded, getAccessToken } = require("../../helpers/authorization/tokenHelpers");
const User = require("../../models/User");

const getAccessToRoute =  (req, res, next) => {
    const {JWT_SECRET_KEY} = process.env;
    
    if(!isTokenIncluded(req)){
        return next(new CustomError("Lütfen giriş yapınız",401))
    }
    const access_token = getAccessToken(req);
    jwt.verify(access_token, JWT_SECRET_KEY, (err,decoded) => {
        if(err) {
            return next(new CustomError("Devam etmek için lütfen giriş yapınız",401))
        }
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email
        }
        next();
    })
}

const getUserAccess = asyncErrorWrapper( async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findById(id);
    if(user.role !== "user"){
        return next(new CustomError("Bu route sadece user erişebilir",403))
    }
    next()
});
const getManagerAccess = asyncErrorWrapper( async (req, res, next) => {
    const { id } = req.user;
    const user= await User.findById(id);
    if(user.role !== "manager") {
        return next(new CustomError("Bu route sadece manager erişebilir",403))
    }
    next();
})

module.exports = {
    getAccessToRoute,
    getUserAccess,
    getManagerAccess
}