const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const Topping = require('../models/Topping');
const Burger = require('../models/Burger');
const ToppingSet = require('../models/ToppingSet');
const Drink = require('../models/Drink');
const Side = require('../models/Side');
const Patty = require('../models/Patty');
const Cheese = require('../models/Cheese');
const Bun = require('../models/Bun');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const verifyUser = require('../middleware/verifyUser');
const session = require('express-session');

// const orderValidator = require('../middleware/orderValidator');


/* GET users/order listing. */
router.get('/order', verifyUser, async function(req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  const buns = await Bun.find({});
  const patties = await Patty.find({});
  const cheeses = await Cheese.find({});
  const toppings = await Topping.find({});
  const sides = await Side.find({});
  const drinks = await Drink.find({});
  // console.log("buns: ", buns);

  res.render('order', {loggedIn, initials, toppings, drinks, sides, cheeses, patties, buns, success: req.session.success, errors: req.session.errors});
  req.session.errors = null;
});

/* GET users/order listing. */
router.post('/order', verifyUser, async function(req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  let id = req.session.userID;
  const { bunType, pattyType, cheeseName, firstTopping, secondTopping, thirdTopping, fourthTopping, sideName, drinkName, quantity } = req.body;
  const buns = await Bun.find({});
  const patties = await Patty.find({});
  const cheeses = await Cheese.find({});
  const toppings = await Topping.find({});
  const sides = await Side.find({});
  const drinks = await Drink.find({});

  req.checkBody('bunType', 'Bun Type is required').not().equals('Select Bun Type')
  req.checkBody('pattyType', 'Patty Type is required').not().equals('Select Patty Type')
  req.checkBody('cheeseName', 'Cheese Type is required').not().equals('Select Cheese')
  req.checkBody('firstTopping', 'First Topping is required').not().equals('Select First Topping');
  req.checkBody('secondTopping', 'Second Topping is required').not().equals('Select Second Topping');
  req.checkBody('thirdTopping', 'Third Topping is required').not().equals('Select Third Topping');
  req.checkBody('fourthTopping', 'Fourth Topping is required').not().equals('Select Fourth Topping');
  req.checkBody('sideName', 'Side Name is required').not().equals('Select Side');
  req.checkBody('drinkName', 'Drink Name is required').not().equals('Select Beverage');
  const errors = req.validationErrors();
  console.log("errors: ", errors);

  const selectedBun = await Bun.findOne({bunType: bunType}).exec();
  const selectedPatty = await Patty.findOne({pattyType: pattyType}).exec();
  const selectedCheese = await Cheese.findOne({cheeseName: cheeseName}).exec();
  console.log("Cheese: ", selectedCheese);
  const selectedFirstTopping = await Topping.findOne({toppingType: firstTopping}).exec();
  const selectedSecondTopping = await Topping.findOne({toppingType: secondTopping}).exec();
  const selectedThirdTopping = await Topping.findOne({toppingType: thirdTopping}).exec();
  const selectedFourthTopping = await Topping.findOne({toppingType: fourthTopping}).exec();
  const selectedSide = await Side.findOne({sideName: sideName}).exec();
  const selectedDrink = await Drink.findOne({drinkType: drinkName}).exec();

  if(errors){
    req.session.errors = errors;
    req.session.success = false;
    res.render('order', {loggedIn, initials, toppings, drinks, sides, cheeses, patties, buns, success: req.session.success, errors: req.session.errors});
 }else{
  for(let i = 0; i < +quantity; i++){
    console.log("ln_85 cheese price: ", selectedCheese.cheesePrice);
    console.log("ln_86_side price: ", selectedSide.sidePrice);
    const orderSubTotal = (selectedBun.bunPrice+selectedPatty.pattyPrice+selectedCheese.cheesePrice+selectedFirstTopping.toppingPrice+selectedSecondTopping.toppingPrice+selectedThirdTopping.toppingPrice+selectedFourthTopping.toppingPrice+selectedSide.sidePrice+selectedDrink.drinkPrice);
    const newOrder = new Order ({
      bunType: bunType,
      bunPrice: selectedBun.bunPrice,
      pattyType: pattyType,
      pattyPrice: selectedPatty.pattyPrice,
      cheeseName: cheeseName,
      cheesePrice: selectedCheese.cheesePrice,
      firstTopping: firstTopping,
      firstToppingPrice: selectedFirstTopping.toppingPrice,
      secondTopping: secondTopping,
      secondToppingPrice: selectedSecondTopping.toppingPrice,
      thirdTopping: thirdTopping,
      thirdToppingPrice: selectedThirdTopping.toppingPrice,
      fourthTopping: fourthTopping,
      fourthToppingPrice: selectedFourthTopping.toppingPrice,
      sideName: sideName,
      sidePrice: selectedSide.sidePrice,
      drinkName: drinkName,
      drinkPrice: selectedDrink.drinkPrice,
      subTotal: orderSubTotal, 
      userID: id
    });
    await newOrder.save();
  }
  // let orders = await Order.find({}).lean();
  // res.render('cart', {orders:orders});
  
  req.session.context = initials;
    req.session.success = true;
    // res.render('cart', {orders:orders});
    res.redirect('/users/cart');
 }

});

router.get('/cart', verifyUser, async function(req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  let grandTotal = 0
  console.log(initials);
  const orders = await Order.find({}).lean();
  orders.forEach(a => {
    grandTotal += +a.subTotal;
  })
  console.log("Grand total is:" + grandTotal);
  res.render('cart', {loggedIn, initials, grandTotal, orders:orders});
});


router.post('/cart', verifyUser, async function(req, res, next) {
  let grandTotal = 0;
  const orders = await Order.find({}).lean();
  orders.forEach(a => {
    grandTotal += +a.subTotal;
  });
  let id = req.session.userID;
  let user = await User.findById({_id: id});
  console.log(user);
  let rewards = Math.floor(grandTotal);
  console.log(rewards)
  let newTotal = user.rewardPoints += rewards;
  user.rewardPoints = newTotal;
  console.log(user);
  console.log('Users points are now:' + user.rewardPoints);
  await user.save((err) => {
    if (err) console.log(err);
    console.log("Rewards added");
  });
  // let updatedOrder = await Order.findByIdAndUpdate({_id: id});
  // console.log(updatedOrder);
  // updatedOrder.rewardPoints = user.rewardPoints;

  // await updatedOrder.save((err) => {
  //   if (err) console.log(err);
  //   console.log("Order edited");
  // });
  let orderCopy = orders;
  await Order.deleteMany({});
  console.log('Orders placed and removed');
  
  
  // res.render('confirmation', {orders:orderCopy});
  res.redirect('/users/confirmation');
});

router.get('/editOrder/:id', verifyUser, async function(req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  let id = req.params.id;
  console.log("id: ", id);
  let order = await Order.findById({_id: id});
  const buns = await Bun.find({});
  const patties = await Patty.find({});
  const cheeses = await Cheese.find({});
  const toppings = await Topping.find({});
  const sides = await Side.find({});
  const drinks = await Drink.find({});
  const currentOrder = await Order.findById({ _id: id });
  console.log("users.js-ln 140 orderIs: ", currentOrder); // Confirmed: This Line Fires
 
  res.render('editOrder', {loggedIn, initials, toppings, drinks, sides, cheeses, patties, buns, order: currentOrder});
  // res.render('editOrder', { order });
});

router.post('/editOrder/:id', async function (req, res, next) {
	const { bunType, pattyType, cheeseName, firstTopping, secondTopping, thirdTopping, fourthTopping, sideName, drinkName, quantity } = req.body;

  const selectedBun = await Bun.findOne({bunType: bunType}).exec();
  // console.log("ln 161 selectedBun: ", bunType );
  // console.log("ln 162 selectedBun.bunPrice: ", selectedBun.bunPrice );
  const selectedPatty = await Patty.findOne({pattyType: pattyType}).exec();
  const selectedCheese = await Cheese.findOne({cheeseName: cheeseName}).exec();
  // console.log("ln 165 selectedCheese: ", selectedCheese);
  // console.log("ln 166 selectedCheese.cheesePrice: ", selectedCheese.cheesePrice );
  const selectedFirstTopping = await Topping.findOne({toppingType: firstTopping}).exec();
  const selectedSecondTopping = await Topping.findOne({toppingType: secondTopping}).exec();
  const selectedThirdTopping = await Topping.findOne({toppingType: thirdTopping}).exec();
  const selectedFourthTopping = await Topping.findOne({toppingType: fourthTopping}).exec();
  const selectedSide = await Side.findOne({sideName: sideName}).exec();
  const selectedDrink = await Drink.findOne({drinkType: drinkName}).exec();

  
  const orderSubTotal = (selectedBun.bunPrice+selectedPatty.pattyPrice+selectedCheese.cheesePrice+selectedFirstTopping.toppingPrice+selectedSecondTopping.toppingPrice+selectedThirdTopping.toppingPrice+selectedFourthTopping.toppingPrice+selectedSide.sidePrice+selectedDrink.drinkPrice);

  newOrder = await Order.findByIdAndUpdate(req.params.id, req.body);
  newOrder.bunPrice = selectedBun.bunPrice;
  newOrder.pattyPrice = selectedPatty.pattyPrice; 
  newOrder.cheesePrice = selectedCheese.cheesePrice; 
  newOrder.firstToppingPrice = selectedFirstTopping.toppingPrice;  
  newOrder.secondToppingPrice = selectedSecondTopping.toppingPrice; 
  newOrder.thirdToppingPrice = selectedThirdTopping.toppingPrice;
  newOrder.fourthToppingPrice = selectedFourthTopping.toppingPrice; 
  newOrder.sidePrice = selectedSide.sidePrice; 
  newOrder.drinkPrice = selectedDrink.drinkPrice; 
  await newOrder.save((err) => {
    if (err) console.log(err);
    console.log("Order edited");
  });
 
  req.session.context = initials;
  res.redirect('/users/cart');
});

router.get('/delete/:id', verifyUser, async function(req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  let id = req.params.id;
  console.log("id: ", id);
  let order = await Order.findById({_id: id});
  res.render('delete', {loggedIn, initials, order:order});
});

router.post('/delete/:id', async function(req, res, next) {
  const id = req.params.id;
  console.log("id: ", id);
  let deleteOrder = await Order.findById({_id: id});
  deleteOrder = await Order.deleteOne({_id: id});
  console.log("Order deleted");
  req.session.context = initials;
  res.redirect('/users/cart');
});

router.get('/confirmation', verifyUser, async function(req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context; 
  let id = req.session.userID;
  let user = await User.findById({_id: id}).lean();
  let rewardPoints = user.rewardPoints; 
  console.log('Reward Points:' + rewardPoints);
  let grandTotal = 0
  const orders = await Order.find({}).lean();
  orders.forEach(a => {
    grandTotal += +a.subTotal;
  })
  let rewardsEarned = Math.floor(grandTotal);
  console.log("Grand total is:" + grandTotal);
  res.render('confirmation', {loggedIn, initials, grandTotal, rewardPoints, rewardsEarned, orders:orders});
});

router.post('/confirmation', async function(req, res, next) {
  const ordersconfirmation = await Order.find({}).lean();
   
  res.render('confirmation', {orders:orderCopy});
});
  

module.exports = router;