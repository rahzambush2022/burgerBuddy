const express = require('express');
const router = express.Router();
const Topping = require("../models/Topping");
const Drink = require("../models/Drink");
const Side = require("../models/Side");
const Burger = require("../models/Burger");
const Bun = require("../models/Bun");
const Patty = require("../models/Patty");
const Cheese = require("../models/Cheese");


router.get('/topping', function(req, res, next) {
  res.render('adminCreateTopping');
});

router.post('/topping', async function(req, res, next) {
    const newTopping = await new Topping({
        toppingType: req.body.toppingType,
        toppingPrice: req.body.toppingPrice
    });
    console.log(newTopping);
    newTopping.save((err) => {
        if(err) console.log(err);
        console.log('Topping saved');
    })
    res.render('index');
});

router.get('/side', function(req, res, next) {
  res.render('adminCreateSide');
});

router.post('/side', async function(req, res, next) {
    const newSide = await new Side({
        sideName: req.body.sideName,
        sidePrice: req.body.sidePrice
    });
    console.log(newSide);
    newSide.save((err) => {
        if(err) console.log(err);
        console.log('Side saved');
    })
    res.render('index');
});

router.get('/drink', function(req, res, next) {
    res.render('adminCreateDrink');
});

router.post('/drink', async function(req, res, next) {
    const newDrink = await new Drink({
        drinkName: req.body.drinkName,
        drinkPrice: req.body.drinkPrice
    });
    console.log(newDrink);
    newDrink.save((err) => {
        if(err) console.log(err);
        console.log('Drink saved');
    })
    res.render('index');
});

router.get('/burger', function(req, res, next) {
    res.render('adminCreateBurger');
});

router.post('/burger', async function(req, res, next) {
    const newBurger = await new Burger({
        bunType: req.body.bunType,
        pattyType: req.body.pattyType,
        basePrice: req.body.basePrice
    });
    console.log(newBurger);
    newBurger.save((err) => {
        if(err) console.log(err);
        console.log('Burger saved');
    })
    res.render('index');
});

router.get('/bun', function(req, res, next) {
  res.render('adminCreateBun');
});

router.post('/bun', async function(req, res, next) {
    const newBun = await new Bun({
        bunName: req.body.bunName,
        bunPrice: req.body.bunPrice
    });
    console.log(newBun);
    newBun.save((err) => {
        if(err) console.log(err);
        console.log('Bun saved');
    })
    res.render('index');
});

router.get('/patty', function(req, res, next) {
  res.render('adminCreatePatty');
});

router.post('/patty', async function(req, res, next) {
    const newPatty = await new Patty({
        pattyName: req.body.pattyName,
        pattyPrice: req.body.pattyPrice
    });
    console.log(newPatty);
    newPatty.save((err) => {
        if(err) console.log(err);
        console.log('Patty saved');
    })
    res.render('index');
});

router.get('/cheese', function(req, res, next) {
  res.render('adminCreateCheese');
});

router.post('/cheese', async function(req, res, next) {
    const newCheese = await new Cheese({
        cheeseName: req.body.cheeseName,
        cheesePrice: req.body.cheesePrice
    });
    console.log(newCheese);
    newCheese.save((err) => {
        if(err) console.log(err);
        console.log('Cheese saved');
    })
    res.render('index');
});

module.exports = router;
