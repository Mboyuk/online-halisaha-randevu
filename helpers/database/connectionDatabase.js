const mongoose=require("mongoose");

const connectionDatabase=()=>{
   
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useFindAndModify:false,
        useCreateIndex:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("connection database aga");
    }).catch(err=>{
        console.log(err);
    });
};
module.exports=connectionDatabase;