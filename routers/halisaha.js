const express = require("express")
const { getAccessToRoute, getUserAccess, getManagerAccess } = require("../middlewares/authorization/auth")
const halisahaImageUpload = require("../middlewares/libraries/halisahaImageUpload");
const { 
    halisahaRegisterRequest, 
    registerHalisaha, 
    makeHalisahaRezervation,
    editHalisaha,
    halisahaImageUploadController,
    imageDelete,
    searchHalisaha,
    halisahaReklam,
    getHalisaha,
    filterHalisaha,
    getHalisahaForLoad,
    getHalisahaRezervationInfo,
    deneme,
    addPrice,
} = require("../controllers/halisaha");


const router = express.Router();

router.post("/register/request", [getAccessToRoute, getUserAccess], halisahaRegisterRequest);
router.post("/register/control", [getAccessToRoute, getManagerAccess], registerHalisaha);
router.post("/:id/edit-halisaha", [getAccessToRoute, getManagerAccess], editHalisaha);
router.get("/:id/edit-halisaha", [getAccessToRoute, getManagerAccess], getHalisahaRezervationInfo);
router.post("/upload/image-upload", [getAccessToRoute,getManagerAccess,halisahaImageUpload.array("halisaha_image",5)], halisahaImageUploadController)
router.post("/delete/image-delete", [getAccessToRoute, getManagerAccess], imageDelete)
router.post("/:city/:id/:slug/:date/:time/reservation", getAccessToRoute, makeHalisahaRezervation);
router.post("/:city/search", searchHalisaha);
router.get("/:city", halisahaReklam);
router.get("/:city/:id/:slug", getHalisaha);
router.get("/:city/search", filterHalisaha);
router.get("/get-halisaha/control", getAccessToRoute, getHalisahaForLoad)
router.post("/add-price/control", [getAccessToRoute, getManagerAccess], addPrice)


// router.post("/deneme", [getAccessToRoute, getManagerAccess], deneme)
module.exports = router;