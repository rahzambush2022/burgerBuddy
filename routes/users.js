const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Topping = require('../models/Topping');
const Burger = require('../models/Burger');
const ToppingSet = require('../models/ToppingSet');
const Drink = require('../models/Drink');
const Side = require('../models/Side');
const Patty = require('../models/Patty');
const Cheese = require('../models/Cheese');
const Bun = require('../models/Bun');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

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
router.get('/order', async function(req, res, next) {
  const toppings = await Topping.find({});
  const drinks = await Drink.find({});
  const sides = await Side.find({});
  const cheeses = await Cheese.find({});
  const patties = await Patty.find({});
  const buns = await Bun.find({});
  // console.log("buns: ", buns);

  res.render('order', {toppings, drinks, sides, cheeses, patties, buns});
});

/* GET users/order listing. */
router.post('/order', async function(req, res, next) {
  const { bunType, pattyType, cheeseType, firstTopping, secondTopping, thirdTopping, fourthTopping, sideName, drinkName, quantity } = req.body;
  for(let i = 0; i < +quantity; i++){
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
  const newSide = new Side({
     sideName: sideName
  });
  const newDrink = new Drink({
    drinkName: drinkName
 });

  newOrder.items.push(newBurger);
  newOrder.items.push(newToppingSet);
  newOrder.items.push(newSide);
  newOrder.items.push(newDrink);
  // console.log('order is ' + newOrder);
  
  // await newOrder.save();
  }

  let orders = await Order.find({}).lean();
    // let orderId;
    // let orderBunType;
    // let orderPattyType;
    // let orderCheeseType;
    // let orderFirstTopping;
    // let orderSecondTopping;
    // let orderThirdTopping;
    // let orderFourthTopping;
    // let orderSide;
    // let orderDrink;
    // let orderSummary="test";
    // console.log("length: ", orders.length);
    // for (let i=0; i<orders.length; i++) {

    //   orderId = order._id;
    //   orderBunType = order.items[0].bunType;
    //   console.log("bunType: ", orderBunType);
    //   orderPattyType = order.items[0].pattyType;
    //   orderCheeseType = order.items[0].cheeseType;
    //   orderFirstTopping = order.items[1].firstTopping;
    //   orderSecondTopping = order.items[1].secondTopping;
    //   orderThirdTopping = order.items[1].thirdTopping;
    //   orderFourthTopping = order.items[1].fourthTopping;
    //   orderSide = order.items[2].sideName;
    //   orderDrink = order.items[3].drinkName;

    // }
  // orders.forEach(order => {
  //   // orderSummary = `orderBunType\norderPattyType\norderCheeseType\norderFirstTopping\norderSecondTopping\norderThirdTopping\norderFourthTopping\norderBunType\norderSide\norderDrink`
  // });
  // console.log("orders are "+ orders);
  res.render('cart', {orders:orders});
}); 

// router.get('/cart', async function(req, res, next) {
//   const orders = await Order.find({});
//   console.log(orders);
//   res.render('cart', {orders});
// });

// router.get('/cart', async function(req, res, next) {
//   const orders = await Order.deleteMany({}, function ( err ) {
//     console .log( "success" );
//   });
//   res.render('order');
// });

// Student.deleteMany({}, function ( err ) {
//   console .log( "success" );
// });

router.post('/cart', async function(req, res, next) {
  const orders = await Order.find({});
  res.render('cart', {orders});
});

module.exports = router;
