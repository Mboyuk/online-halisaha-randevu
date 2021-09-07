const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HalisahaCommentAndPointSchema = new Schema({
    halisahaId: {
        type: mongoose.Schema.ObjectId,
        ref: "Halisaha"
    },
    commentInfo: [
        {
            userId: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            comment: {
                type: String
            },
            point: {
                type: Number,
            },
            profile_image: {
                type: String
            },
            userNickname: {
                type: String
            }
        }
    ]
})

module.exports = mongoose.model("HalisahaCommentAndPoint", HalisahaCommentAndPointSchema);