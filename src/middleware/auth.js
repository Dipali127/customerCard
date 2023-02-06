const jwt=require('jwt');
const cardModel=require("../model/cardModel");
const customerModel=require("../model/customerModel");
const validator = require("../validator/validation")

const authentication = async function(req,res){
    try{
        let token = req.headers["x-api-key"]
        if (!token) return res.status(400).send({ status: false, message: "Token required" })
        jwt.verify(token, "group14project3", (error, decodedToken) => {
            if (error) {
                return res.status(401).send({ status: false, message: "invalid token"});

            }
            req.customerId = decodedToken.customerId    //this line for we can access this token outside the middleware
            next()

        });

    }catch(error){
        return res.status(500).send({status:false, message:error.message});
    }
} 



module.exports={authentication}