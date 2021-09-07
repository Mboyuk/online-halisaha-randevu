const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const User = require("../models/User");
const HalisahaMessage = require("../models/HalisahaRegisterRequestMessage")
const Halisaha = require("../models/Halisaha")
const HalisahaRandevu = require("../models/HalisahaRandevu")
const HalisahaPriceTable = require("../models/HalisahaPriceTable");
const  { createDynamicTable } = require("../helpers/halisahaTable/manager/createTable");
const HalisahaCommentAndPoint = require("../models/HalisahaCommentAndPoint");

const halisahaRegisterRequest = asyncErrorWrapper( async (req, res, next) => {
    const { content } = req.body;
    if(!content) {
        return next(new CustomError("Mesaj alanı boş bırakılamaz",400))
    }
    const user = await User.findById(req.user.id);
    const halisahaMessage = await HalisahaMessage.findOne({userId: req.user.id});
    if(halisahaMessage){
        halisahaMessage.message.push(content);
        halisahaMessage.save();
    } else {
        const messasge = await HalisahaMessage.create({
            userId: req.user.id,
            name: req.user.name,
            surname: user.surname,
            email: req.user.email,
            message: content,
        });
    }
    
    res.status(200).json({
        success: true,
        message: "Mesaj iletildi"
    })
})

const registerHalisaha = asyncErrorWrapper( async (req, res, next) => {
    const { name, city, fieldCount, content, opening, closing, price } = req.body;
    const userId = req.user.id;
    const currentHalisaha = await Halisaha.findOne({userId});
    if(currentHalisaha) {
        return next(new CustomError("Halısahanız mevcut",400))
    } else {
        var halisaha = await Halisaha.create(
            {
                userId,
                name,
                city,
                fieldCount,
                content,
                opening,
                closing,
                price
            }
        )
        halisaha = await halisaha.save();
        
        const halisahaRandevu = await HalisahaRandevu.create(
            {
                halisahaId: halisaha.id,
                fieldNumber: 1,//BURAYA BAK AGA

            }
        )
        await halisahaRandevu.save()

        const halisahaPriceTable = await HalisahaPriceTable.create(
            {
                halisahaId: halisaha.id
            }
        )
        await halisahaPriceTable.save()
        const halisahaCommentAndPoint = await HalisahaCommentAndPoint.create(
            {
                halisahaId: halisaha.id
            }
        )
        await halisahaCommentAndPoint.save();
    }
    res.status(200).json({
        success: true,
        message: "Halı sahanız başarıyla oluşturuldu",
        data: halisaha
    })
})

const editHalisaha = asyncErrorWrapper(async (req, res, next) => {
    const { price, halisahaMessage, halisahaProperties } = req.body;
    const halisaha = await Halisaha.findOne(
        {
            userId: req.user.id
        }
    )
    
    halisaha.price = price;
    halisaha.content = halisahaMessage;
    halisaha.properties = halisahaProperties;

    await halisaha.save();
    res.status(200).json({
        success: true,
        data: halisaha
    })

})
const getHalisahaRezervationInfo = asyncErrorWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const halisaha = await Halisaha.findOne({ userId });
    if(!halisaha) {
        return next(new CustomError("Böyle bir halı saha yok", 400));
    }
    const halisahaPriceTable = await HalisahaPriceTable.findOne({ halisahaId: halisaha.id });
    const halisahaRandevu = await HalisahaRandevu.findOne({ halisahaId: halisaha.id })
    const opening = halisaha.opening;
    const closing = halisaha.closing;
    const price = halisaha.price
    const rezervationInfo = halisahaRandevu.rezervasyonBilgileri
    const priceList = halisahaPriceTable.priceList
    const rezervationArray = await createDynamicTable(opening, closing, price, rezervationInfo, priceList )

    res.status(200).json({
        success: true,
        rezervationArray
    })

})
const addPrice = asyncErrorWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const { rezervationDate, rezervationTime, price } = req.body;
    const halisaha = await Halisaha.findOne({ userId });
    if(!halisaha) {
        return next(new CustomError("böyle bir halı saha yok", 400))
    }
    const obj = {
        rezervationDate,
        rezervationTime,
        price,
    }
    const halisahaId = halisaha.id
    const halisahaPrice = await HalisahaPriceTable.findOne({ halisahaId });
    let bool = false;
    halisahaPrice.priceList.forEach(element => {
        if(element.rezervationDate === rezervationDate && element.rezervationTime === rezervationTime) {
            element.price = price
            bool = true;
        }
    })
    if(!bool) {
        halisahaPrice.priceList.push(obj)
    }

  
    await halisahaPrice.save();

    res.status(200).json({
        success: true,
        data: halisahaPrice
    })

})
const halisahaImageUploadController = asyncErrorWrapper(async (req, res, next) => {
    const halisaha = await Halisaha.findOne(
        {
            userId: req.user.id
        }
    );
    const imageArray = [];
    req.files.forEach((element) => {
        imageArray.push(element.filename);
    })
    halisaha.image = imageArray;
    await halisaha.save();
    console.log(imageArray)
    res.status(200).json({
        success: true,
        data: halisaha
    })

})
const imageDelete = asyncErrorWrapper(async (req, res, next) => {
    const { imageName } = req.body;
    const halisaha = await Halisaha.findOneAndUpdate(
        {
            userId: req.user.id
        },
        {
            $pull: {
                image: imageName
            }
        },
        {
            new: true,
            runValidators: true
        }
    )
    res.status(200).json({
        success: true,
        data: halisaha
    })
})


const makeHalisahaRezervation = asyncErrorWrapper(async (req, res, next) => {
    const { city, id, slug, date, time } = req.params;
    const userId = req.user.id;
    const halisahaRandevu = await HalisahaRandevu.findOne({
        halisahaId: id
    })
    const rezervasyon = {
        userId,
        tarih: date,
        saat: time,
    }
    if(halisahaRandevu.rezervasyonBilgileri.some(item => item.tarih === rezervasyon.tarih && item.saat===rezervasyon.saat)){
        return next(new CustomError("Bu tarihte randevu alınmuş",400))
    }
    halisahaRandevu.rezervasyonBilgileri.push(rezervasyon);
    await halisahaRandevu.save();
    res.status(200).json({
        success: true,
        data: rezervasyon
    })
})

const searchHalisaha = asyncErrorWrapper(async (req, res, next) => {
    const { searchWord } = req.body;
    const { city } = req.params;
    let query = Halisaha.find({ city: city });
    if(searchWord) {
        const searchObject = {};
        const regex = new RegExp(searchWord,"i");
        searchObject["name"] = regex;      
        query = query.where(searchObject);
    }
    const halisaha = await query;

    res.status(200).json({
        success: true,
        data: halisaha
    })
})
const halisahaReklam = asyncErrorWrapper(async (req, res, next) => {
    const { city } = req.params;
    const halisaha = await Halisaha.find({ city });
    if(!halisaha) {
        return next(new CustomError("Bu şehirde mevcut halı saha yok",400))
    }
    res.status(200).json({
        success: true,
        data: halisaha
    })

})

const getHalisaha = asyncErrorWrapper(async (req, res, next) => {
    const { id, slug } = req.params;
    const halisaha = await Halisaha.findById(id)
    if(!halisaha) {
        return next(new CustomError("Böyle bir halı saha yok", 400));
    }
    const halisahaPriceTable = await HalisahaPriceTable.findOne({ halisahaId: halisaha.id });
    const halisahaRandevu = await HalisahaRandevu.findOne({ halisahaId: halisaha.id })
    const opening = halisaha.opening;
    const closing = halisaha.closing;
    const price = halisaha.price
    const rezervationInfo = halisahaRandevu.rezervasyonBilgileri
    const priceList = halisahaPriceTable.priceList
    const rezervationArray = await createDynamicTable(opening, closing, price, rezervationInfo, priceList )
    let halisahaComPnt = await HalisahaCommentAndPoint.findOne({ halisahaId: id });
    //maybe can do control
    const halisahaComInfo = halisahaComPnt.commentInfo
    res.status(200).json({
        success: true,
        data: rezervationArray,
        data2: halisaha,
        halisahaComInfo,
    })
});

const filterHalisaha = asyncErrorWrapper(async (req, res, next) => {
    const { city } = req.params;
    const halisaha = await Halisaha.find({ city });
    if(!halisaha) {
        return next(new CustomError("Bu şehirde halı saha mevcut değil"));
    }
    res.status(200).json({
        success: true,
        data: halisaha
    })
})

const getHalisahaForLoad = asyncErrorWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const halisaha = await Halisaha.findOne({ userId })
    if(!halisaha) {
        return next(new CustomError("Böyle bir halı saha yok",400))
    }
    res.status(200).json({
        success: true,
        data: halisaha
    })

})






const deneme = asyncErrorWrapper( async (req, res, next) => {
    const id = "611a6ca62cb38314d4caa9f8"
    const halisahaRandevu = await HalisahaRandevu.findOne({halisahaId:id})
    halisahaRandevu.rezervasyonBilgileri.push({userId : "6118202e3432832b0837380d",tarih:"13-7",saat:"20-21"})
    await halisahaRandevu.save()
    console.log(halisahaRandevu);

})


module.exports = {
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
    addPrice
}