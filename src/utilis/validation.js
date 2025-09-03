const validator = require("validator")

const validation = ({ userName, email, password }) => {
    console.log(userName, email, password, "validation")

    if (!userName || !email || !password) {
        throw new Error("all field are requires");
    } else if (validator.isEmail(email) == false) {
        throw new Error("email must be valid")
    } else if (validator.isStrongPassword(password) == false) {
        throw new Error("password must be strong");
    }
}

module.exports = { validation }