const User = require("../../models/User")

const isEmail = async (email) => {

    const user = await User.findOne({email});
    if(user){
        return true
    }
    return false

}

module.exports={
    isEmail,
}