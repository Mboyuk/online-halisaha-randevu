const bcrypt = require("bcryptjs")
const isPasswordMatch = (password, password2) => {
    if(password !== password2) {
        return false
    }
    return true
}
const validateUserInput = (email, password) => {
    return email && password
}
const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password,hashedPassword);
}
module.exports={
    isPasswordMatch,
    validateUserInput,
    comparePassword
}