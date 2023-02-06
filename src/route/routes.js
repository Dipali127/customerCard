const express=require('express');
const router=express.Router();
const customerController=require("../controller/customerController");
const cardController=require("../controller/cardController");
const middleware=require('../middleware/auth.js')


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>customerApi's>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
router.post('/customer/create', customerController.newCustomer);
router.post('/customer/login',customerController.loginCustomer);
router.get('/customer/:id/active', middleware.authentication,customerController.getActiveCustomers);
router.delete('/customer/delete/:id', middleware.authentication,customerController.deleteCustomer)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>cardApi's>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
router.get('/card/get/:userId', middleware.authentication,cardController.getCards);
router.post('/card/create', middleware.authentication, cardController.createCard);


