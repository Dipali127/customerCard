const mongoose=require("mongoose");

// checking that there is something as input
const checkInputsPresent = (value) => { return (Object.keys(value).length > 0) };

// validating that the input must be a non-empty string
const checkString = (value) => { return ((typeof (value) === 'string' && value.trim().length > 0)) };

//validation for checking firstName and lastName
const checkName = (name)=>{return (/^[a-zA-Z ]+$/).test(name)}

//validating emailId
 const checkEmailId = (email)=>{return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))}

 //validating mobile
 const checkMobile = (mobile)=>{return ((/^[6789][0-9]{9}$/g).test(mobile))}

//validating object Id
 const validateId = (id) => { return mongoose.isValidObjectId(id); }

 const isValidPassword = function (password) {
    return (/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))
}

 module.exports={checkInputsPresent,checkString,checkName,checkEmailId,checkMobile,validateId,isValidPassword} ;
