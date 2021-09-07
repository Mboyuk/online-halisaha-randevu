const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreTransactionSchema = new Schema ({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    preTransactions: [
        {
            halisahaId: {
                type: mongoose.Schema.ObjectId,
                ref: "Halisaha"
            },
            halisahaName: {
                type: String
            },
            date: {
                type: String
            },
            time: {
                type: String
            },
            isComment: {
                type: Boolean,
                default: false
            },
            createAt: {
                type: Date,
                default: Date.now()
            }
        }
    ]
})

module.exports = mongoose.model("PresTransaction",PreTransactionSchema);