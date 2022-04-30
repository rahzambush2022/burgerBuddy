const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Topping = require('../models/Topping');
const Burger = require('../models/Burger');
const ToppingSet = require('../models/ToppingSet');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* GET users/adminLogin listing. */
router.get('/adminLogin', function(req, res, next) {
  res.render('adminLogin');
});

module.exports = router;

/* GET users/login listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET users/order listing. */
router.get('/order', function(req, res, next) {
  res.render('order');
});

/* GET users/order listing. */
router.post('/order', async function(req, res, next) {
  const { bunType, pattyType, cheeseType, firstTopping, secondTopping, thirdTopping, fourthTopping } = req.body;
  const newOrder = new Order ({item: []});
  const newBurger = new Burger({
    bunType: bunType,
    pattyType: pattyType,
    cheeseType: cheeseType
  });
  const newToppingSet = new ToppingSet({
    firstTopping: firstTopping,
    secondTopping: secondTopping,
    thirdTopping: thirdTopping,
    fourthTopping: fourthTopping
  });
  // console.log('bunType is '+ newBurger.bunType);
  console.log('burger is ' + newBurger);
  console.log('toppingSet is ' + newToppingSet);

  // if(req.body.firstTopping !== 'None'){
  //   const firstTopping = await Topping.findOne({name: firstTopping});
  //   // console.log('First topping is ' + firstTopping);
  //   newBurger.toppings.push(firstTopping);
  // }
  // if(req.body.secondTopping !== 'None'){
  //   const secondTopping = await Topping.findOne({name: secondTopping});
  //   // console.log('Second topping is ' + secondTopping);
  //   newBurger.toppings.push(secondTopping);
  // }
  // if(req.body.thirdTopping !== 'None'){
  //   const thirdTopping = await Topping.findOne({name: thirdTopping});
  //   // console.log('Third topping is ' + thirdTopping);
  //   newBurger.toppings.push(thirdTopping);
  // }
  // if(req.body.fourthTopping !== 'None'){
  //   const fourthTopping = await Topping.findOne({name: fourthTopping});
  //   // console.log('Fourth topping is ' + fourthTopping);
  //   newBurger.toppings.push(fourthTopping);
  // }
  // console.log('toppings are' + newBurger.toppings)
  // newOrder.items.push(newBurger);
  // console.log('order is ' + newOrder);


  res.render('order');
}); 

module.exports = router;
