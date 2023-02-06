const customerModel = require('../model/customerModel');
const cardModel = require('../model/cardModel');
const validator = require('../validator/validation');


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>getCard>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
const getCards = async function(req, res){
    try {
      const customerIdFromParams = req.params.customerId;
      if (!validator.validateId(customerIdFromParams)) {
        return res.status(400).send({ status: false, message:"invalid id"});
      }
  
      // authorizing customer
      if (customerIdFromParams !== req.customerId){
        return res.status(403).send({ status: false, message: "Unauthorized user access" });
      }                  
  
      const cards = await cardModel.find({ _id: customerIdFromParams });
      return res.status(200).send({ status: true, message: "cards fetched successfully", data: cards });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
  
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>createCard>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
   const createCard = async function(req, req){
    try {
      const customerIdFromParams = req.params.userId;
      const { cardType, customerName, status, vision, customerID } = req.body;
  
      if (!validator.checkInputsPresent(req.body)){
        return res.status(400).send({ status: false, message: "provide data in request body"});
      }
  
      if (!validator.validateId(customerIdFromParams)){
        return res.status(400).send({ status: false, message: "invalid id"});
      }
  
      // authorizing customer
      if (customerIdFromParams !== req.customerId){
        return res.status(403).send({ status: false, message: "Unauthorized User" })
      }
  
      if (!validator.checkString(cardType)) {
        return res.status(400).send({ status: false, message: "cardType is required." });
      } 
      if (!(cardType === 'REGULAR' || cardType === 'SPECIAL')){
            return res.status(400).send({ status: false, message: "cardType can only be REGULAR or SPECIAL" });
      }
  
      if (!validator.checkString(customerName)){
        return res.status(400).send({ status: false, message: "customerName is required."});
      }
      if (status) {
        if (!(status === 'ACTIVE' || status === 'INACTIVE')){
            return res.status(400).send({ status: false, message: "status can only be ACTIVE or INACTIVE" });
      }
    }
  
      if (!validator.checkString(customerID)) {
        return res.status(400).send({ status: false, message: "customerID is required." });
      } 
        if (!validator.validateId(customerID)){
            return res.status(400).send({ status: false, message: "invalid id"});
        }
  
        const customer = await customerModel.findById(customerID);
        if (!customer){
            return res.status(404).send({ status: false, message: `customer with customerID: ${customerID} is not found.` });
        } 
      
      const card = await cardModel.create(req.body);
      return res.status(201).send({ status: true, message: "card created successfully", data: card });
  
    }catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
}

//................................................................................................................//
module.exports={getCards,createCard}