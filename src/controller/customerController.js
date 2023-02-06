const customerModel = require('../model/customerModel.js');
const validator = require('../validator/validation.js');


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Create New Customer>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

const newCustomer = async function (req, res) {
    try {
        let body = req.body;
        if (!validator.checkInputsPresent(body)) {
            return res.status(400).send({ status: false, message: "please,provide data in the request body" });
        }

        const { firstName, lastName, mobileNumber, DOB, emailID, address } = body;

        // checking & validating all the required fields .. if correct then assigning it 
        if (!validator.checkString(firstName)) {
            return res.status(400).send({ status: false, message: "firstName is required" });
        }
        if (!validator.checkName(firstName)) {
            return res.status(400).send({ status: false, message: "Invalid firstName" });
        }

        if (!validator.checkString(lastName)) {
            return res.status(400).send({ status: false, message: "lastName is required" });
        }
        if (!validator.checkName(lastName)) {
            return res.status(400).send({ status: false, message: "Invalid lastName" });
        }

        if (!validator.checkString(mobileNumber)) {
            return res.status(400).send({ status: false, message: "mobile number is required" });
        }
        if (!validator.checkMobile(mobileNumber)) {
            return res.status(400).send({ status: false, message: "Invalid mobileNumber" });
        }

        if (!validator.checkString(emailID)) {
            return res.status(400).send({ status: false, message: "emailID is required" });
        }

        if (!validator.checkEmailId(emailID)) {
            return res.status(400).send({ status: false, message: "Invalid emailId" });
        }


        if (DOB) {
            if (!validator.checkString(DOB)) {
                return res.status(400).send({ status: false, message: "please provide your date of birth (DOB)" });
            }
        }

        if (address) {
            if (!isValid(address)) return res.status(400).send({ status: false, message: "please provide your address" });
        }

        const uniqueID = uuidV4();
        req.body.customerID = uniqueID;

        //create a newCustomer 
        const customer = await customerModel.create(body);
        return res.status(201).json({ status: true, message: "New Customer Registered Successfully", data: customer });


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>loginCustomer>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const loginCustomer =async function(req,res){
    try{
        let data=req.body;
        let email=data.emailId;
        let password=data.password;

        if(!validator.checkString(email)){
            return res.status(400).send({status:false,message:"eamil is required"});
        }
        if(!validator.checkEmailId(email)){
            return res.status(400).send({status:false,message:"Invalid email"});
        }
        if(!validator.checkString(password)){
            return res.status(400).send({status:false,message:"password is required"});
        }
        if(!validator.isValidPassword(password)){
            return res.status(400).send({status:false,message:"Invalid password"});
        }
        
        let token=jwt.sign({
            customerId: user._id.toString(),
            iat:Math.floor(Date.now()/1000)
        },
              "customerCardProject" , {expiresIn:"1hr"}
        )

        res.header("x-api-key",token);
        return res.status(200).send({status:true,message:"login successfully"});

    }catch(error){
        return res.status(500).send({status:false,message:error.message});
    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>getCustomer>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

const getActiveCustomers = async function(req, res){
    try {
      const customerIdFromParams = req.params.id;
      if (!validator.validateId(customerIdFromParams)){
        return res.status(400).send({ status: false, message: "Invalid userId"});
      }

      const customerActive = await customerModel.find({ status: "ACTIVE" });
      if (customerActive) {
        return res.status(200).send({ status: true, message: "data fetched successfully", data: customerActive });
      } else {
        return res.status(404).send({ status: false, message: "no activeCustomer found" });
      }
    } catch (error) {
      res.status(500).send({ status: false, error: error.message });
    }
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>deleteCustomer>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

  const deleteCustomer = async function(req, res){
    try {
      const customerIdFromParams = req.params.CustomerId;
      if (!validator.validateId(customerIdFromParams)){
        return res.status(500).send({ status: false, message: "invalid Id"});
      } 

      // authorizing customer
    if (customerIdFromParams !== req.customerId){
        return res.status(403).send({ status: false, message: "Unauthorized User" });
    }
  
     await customerModel.findOneAndUpdate({ _id: customerIdFromParams },
      {
           $set:{ isDeleted: true, deletedAt: new Date()}
      });
      return res.status(200).send({ status: true, message: 'Deleted'});
  
    } catch (error) {
      res.status(500).send({ status: false, error: error.message });
    }
  }
//.................................................................................................................//
module.exports = {newCustomer,loginCustomer,getActiveCustomers,deleteCustomer}