const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;

const cardSchema=new mongoose.Schema({
    cardNumber:{
        type:String,
        required:true
    },
    cardType:{
        type:String,
        enum: ["REGULAR", "SPECIAL"],
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:active
    },
    vision:{
        type:String,
    },
    customerId:{
        type:ObjectId,
        required:true,
        ref:'Customer'
    },
},{timestamps:true});

module.exports=mongoose.model("Card",cardSchema);
