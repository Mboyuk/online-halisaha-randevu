const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const halisahaRegisterRequestMessage = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
    },
    surname: {
        type:String,
    },
    email: {
        type:String,
    },
    message: [{
        type: String
    }]

})

module.exports = mongoose.model("halisahaRegisterMessages", halisahaRegisterRequestMessage);