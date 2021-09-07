const mongoose = require("mongoose");
const slugify=require("slugify");
const Schema = mongoose.Schema;


const HalisahaSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required:[true,"Lütfen halısaha adı giriniz"],
    },
    city: {
        type: String,
        required:[true,"Lütfen şehir giriniz"],
    },
    fieldCount:{
        type: Number,
        default: 1,
        required:[true,"Lütfen saha sayısını giriniz"],
    },
    avgPoint: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    likeCount: {
        type: Number,
        default: 0
    },
    slug: {
        type: String
    },
    content:{
        type:String,
        required:[true,"Lütfen içerik giriniz"],
    },
    properties: [
        {
            type: String
        }
    ],
    image: [
        {
            type: String
        }
    ],
    adress:{
        type:String,
        
    },
    socialMedia:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    price: {
        type: Number,
    },
    opening: {
        type: String,
    },
    closing: {
        type: String
    }




});
HalisahaSchema.pre("save",function(next){
    if(!this.isModified("name")){
        next();
    }
    this.slug=this.makeSlug();
    next();
});

HalisahaSchema.methods.makeSlug = function() {
    return slugify(this.name, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
    });
}
module.exports = mongoose.model("Halisaha",HalisahaSchema)