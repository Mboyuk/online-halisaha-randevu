const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const HalisahaRandevuSchema = new Schema({
    halisahaId: {
        type: mongoose.Schema.ObjectId,
        ref: "Halisaha",
    },
    fieldNumber: {
        type: Number,
    },
    rezervasyonBilgileri: [
        {
            userId: {
                type:mongoose.Schema.ObjectId,
                ref: "User"
            },
            tarih: {
                type: String
            },
            saat: {
                type: String
            }    
        }
    ]


}) 


module.exports = mongoose.model("HalisahaRandevu", HalisahaRandevuSchema)