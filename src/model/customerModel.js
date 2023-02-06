const mongoose=require('mongoose');
const customerSchema=new mongoose.Schema({
    firsName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobileNumber:{
        type: String,
        required: true,
        unique: true
    },
    DOB:{
        type:Date
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    address:{
        type:String,
        required:true
    },
    customerId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ["ACTIVE", "INACTIVE"]
    }
},{timestamps:true});

module.exports=mongoose.model('Customer',customerSchema)