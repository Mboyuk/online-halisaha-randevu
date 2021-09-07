const express = require('express');
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");
const { getAccessToRoute } = require("../middlewares/authorization/auth")
const { 
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
} = require("../controllers/auth")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verifyEmail", verifyEmail);
router.post("/edit-profile", getAccessToRoute, editProfile);
router.post("/edit-photo", [ getAccessToRoute, profileImageUpload.single("profile_image") ], editPhoto);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", getAccessToRoute, changePassword);
router.get("/get-user", getAccessToRoute, getUser);
router.post("/pre-transactions", getAccessToRoute, setPreTransactions)
router.get("/pre-transactions", getAccessToRoute, getPreTransactions);
router.post("/comment-point", getAccessToRoute, addCommentAndPoint)


module.exports=router
