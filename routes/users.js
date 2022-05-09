const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const User = require("../models/User");
const Topping = require("../models/Topping");
const Burger = require("../models/Burger");
const ToppingSet = require("../models/ToppingSet");
const Drink = require("../models/Drink");
const Side = require("../models/Side");
const Patty = require("../models/Patty");
const Cheese = require("../models/Cheese");
const Bun = require("../models/Bun");
const expressValidator = require("express-validator");
const verifyUser = require("../middleware/verifyUser");
const session = require("express-session");

/* GET users/order listing. */
router.get("/order", verifyUser, async function (req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  const buns = await Bun.find({});
  const patties = await Patty.find({});
  const cheeses = await Cheese.find({});
  const toppings = await Topping.find({});
  const sides = await Side.find({});
  const drinks = await Drink.find({});

  res.render("order", {
    loggedIn,
    initials,
    toppings,
    drinks,
    sides,
    cheeses,
    patties,
    buns,
    success: req.session.success,
    errors: req.session.errors,
  });
  req.session.errors = null;
});

/* GET users/order listing. */
router.post("/order", verifyUser, async function (req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  let id = req.session.userID;
  const {
    bunType,
    pattyType,
    cheeseName,
    firstTopping,
    secondTopping,
    thirdTopping,
    fourthTopping,
    sideName,
    drinkName,
    quantity,
  } = req.body;
  const buns = await Bun.find({});
  const patties = await Patty.find({});
  const cheeses = await Cheese.find({});
  const toppings = await Topping.find({});
  const sides = await Side.find({});
  const drinks = await Drink.find({});

  req
    .checkBody("bunType", "Bun Type is required")
    .not()
    .equals("Select Bun Type");
  req
    .checkBody("pattyType", "Patty Type is required")
    .not()
    .equals("Select Patty Type");
  req
    .checkBody("cheeseName", "Cheese Type is required")
    .not()
    .equals("Select Cheese");
  req
    .checkBody("firstTopping", "First Topping is required")
    .not()
    .equals("Select First Topping");
  req
    .checkBody("secondTopping", "Second Topping is required")
    .not()
    .equals("Select Second Topping");
  req
    .checkBody("thirdTopping", "Third Topping is required")
    .not()
    .equals("Select Third Topping");
  req
    .checkBody("fourthTopping", "Fourth Topping is required")
    .not()
    .equals("Select Fourth Topping");
  req
    .checkBody("sideName", "Side Name is required")
    .not()
    .equals("Select Side");
  req
    .checkBody("drinkName", "Drink Name is required")
    .not()
    .equals("Select Beverage");
  const errors = req.validationErrors();

  const selectedBun = await Bun.findOne({ bunType: bunType }).exec();
  const selectedPatty = await Patty.findOne({ pattyType: pattyType }).exec();
  const selectedCheese = await Cheese.findOne({
    cheeseName: cheeseName,
  }).exec();
  const selectedFirstTopping = await Topping.findOne({
    toppingType: firstTopping,
  }).exec();
  const selectedSecondTopping = await Topping.findOne({
    toppingType: secondTopping,
  }).exec();
  const selectedThirdTopping = await Topping.findOne({
    toppingType: thirdTopping,
  }).exec();
  const selectedFourthTopping = await Topping.findOne({
    toppingType: fourthTopping,
  }).exec();
  const selectedSide = await Side.findOne({ sideName: sideName }).exec();
  const selectedDrink = await Drink.findOne({ drinkType: drinkName }).exec();

  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
    res.render("order", {
      loggedIn,
      initials,
      toppings,
      drinks,
      sides,
      cheeses,
      patties,
      buns,
      success: req.session.success,
      errors: req.session.errors,
    });
  } else {
    for (let i = 0; i < +quantity; i++) {
      const orderSubTotal =
        selectedBun.bunPrice +
        selectedPatty.pattyPrice +
        selectedCheese.cheesePrice +
        selectedFirstTopping.toppingPrice +
        selectedSecondTopping.toppingPrice +
        selectedThirdTopping.toppingPrice +
        selectedFourthTopping.toppingPrice +
        selectedSide.sidePrice +
        selectedDrink.drinkPrice;
      const newOrder = new Order({
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
        userID: id,
      });
      await newOrder.save();
    }

    req.session.context = initials;
    req.session.success = true;
    res.redirect("/users/cart");
  }
});

router.get("/cart", verifyUser, async function (req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  let id = req.session.userID;
  let usedReward = false;
  let usedRewardValue = 0;
  let user = await User.findById({ _id: id });
  if (+user.rewardPoints >= +100) {
    usedReward = true;
  }
  let grandTotal = 0;
  const orders = await Order.find({}).lean();
  orders.forEach((a) => {
    grandTotal += +a.subTotal;
  });
  if (usedReward === true) {
    if (grandTotal < 10) {
      grandTotal = 0;
      usedRewardValue = Math.floor(grandTotal);
    } else {
      grandTotal -= 10;
      usedRewardValue = 10;
    }
  }

  res.render("cart", {
    usedReward,
    usedRewardValue,
    loggedIn,
    initials,
    grandTotal,
    orders: orders,
  });
});

router.post("/cart", verifyUser, async function (req, res, next) {
  let grandTotal = 0;
  let usedReward = false;
  const orders = await Order.find({}).lean();
  orders.forEach((a) => {
    grandTotal += +a.subTotal;
  });
  let id = req.session.userID;
  let user = await User.findById({ _id: id });
  if (user.rewardPoints > 100) {
    usedReward = true;
  }
  if (usedReward === true) {
    if (grandTotal < 10) {
      grandTotal = 0;
      user.rewardPoints = user.rewardPoints - Math.floor(grandTotal) * 10;
    } else {
      grandTotal -= 10;
      user.rewardPoints = user.rewardPoints - 100;
    }
  }
  let earnedRewards = Math.floor(grandTotal);
  let newTotalRewards = (user.rewardPoints += earnedRewards);
  user.rewardPoints = newTotalRewards;
  await user.save((err) => {
    if (err) console.log(err);
  });
  res.redirect("/users/confirmation");
});

router.get("/editOrder/:id", verifyUser, async function (req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  let id = req.params.id;
  const buns = await Bun.find({});
  const patties = await Patty.find({});
  const cheeses = await Cheese.find({});
  const toppings = await Topping.find({});
  const sides = await Side.find({});
  const drinks = await Drink.find({});
  const currentOrder = await Order.findById({ _id: id });

  res.render("editOrder", {
    loggedIn,
    initials,
    toppings,
    drinks,
    sides,
    cheeses,
    patties,
    buns,
    order: currentOrder,
  });
});

router.post("/editOrder/:id", async function (req, res, next) {
  const {
    bunType,
    pattyType,
    cheeseName,
    firstTopping,
    secondTopping,
    thirdTopping,
    fourthTopping,
    sideName,
    drinkName,
    quantity,
  } = req.body;

  const selectedBun = await Bun.findOne({ bunType: bunType }).exec();
  const selectedPatty = await Patty.findOne({ pattyType: pattyType }).exec();
  const selectedCheese = await Cheese.findOne({
    cheeseName: cheeseName,
  }).exec();
  const selectedFirstTopping = await Topping.findOne({
    toppingType: firstTopping,
  }).exec();
  const selectedSecondTopping = await Topping.findOne({
    toppingType: secondTopping,
  }).exec();
  const selectedThirdTopping = await Topping.findOne({
    toppingType: thirdTopping,
  }).exec();
  const selectedFourthTopping = await Topping.findOne({
    toppingType: fourthTopping,
  }).exec();
  const selectedSide = await Side.findOne({ sideName: sideName }).exec();
  const selectedDrink = await Drink.findOne({ drinkType: drinkName }).exec();

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
  });

  res.redirect("/users/cart");
});

router.get("/delete/:id", verifyUser, async function (req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  let id = req.params.id;
  let order = await Order.findById({ _id: id });
  res.render("delete", { loggedIn, initials, order: order });
});

router.post("/delete/:id", async function (req, res, next) {
  const id = req.params.id;
  let deleteOrder = await Order.findById({ _id: id });
  deleteOrder = await Order.deleteOne({ _id: id });
  req.session.context = initials;
  res.redirect("/users/cart");
});

router.get("/confirmation", verifyUser, async function (req, res, next) {
  let loggedIn = res.loggedIn;
  let initials = req.session.context;
  let usedReward = false;
  let usedRewardValue = 0;
  let id = req.session.userID;
  let user = await User.findById({ _id: id }).lean();
  let rewardPoints = user.rewardPoints;
  let grandTotal = 0;
  const orders = await Order.find({}).lean();
  orders.forEach((a) => {
    grandTotal += +a.subTotal;
  });
  if (user.rewardPoints > 100) {
    usedReward = true;
  }
  if (usedReward === true) {
    if (grandTotal < 10) {
      grandTotal = 0;
      usedRewardValue = Math.floor(grandTotal);
    } else {
      grandTotal -= 10;
      usedRewardValue = 10;
    }
  }
  let rewardsEarned = Math.floor(grandTotal);
  let orderCopy = orders;
  await Order.deleteMany({});
  res.render("confirmation", {
    loggedIn,
    initials,
    grandTotal,
    rewardPoints,
    rewardsEarned,
    usedReward,
    usedRewardValue,
    orders: orderCopy,
  });
});

router.post("/confirmation", async function (req, res, next) {
  res.redirect("/");
});

module.exports = router;
