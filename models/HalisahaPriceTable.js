const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const HalisahaPriceTableSchema = new Schema({ 
    halisahaId: {
        type: mongoose.Schema.ObjectId,
        ref: "Halisaha"
    },
    priceList: [
        {
            rezervationDate: {
                type: String,
            },
            rezervationTime: {
                type: String
            },
            price: {
                type: Number
            }
        }
    ]
})

module.exports = mongoose.model("HalisahaPriceTable", HalisahaPriceTableSchema);