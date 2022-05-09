router.post('/editOrder/:id', async function (req, res, next) {
	let id = req.body.id;
	const editOrder = await Order.find({ _id: id });
	console.log('users.js-ln_148 editOrder: ', editOrder);
	editOrder.bunType = req.body.bunType;
	console.log('users.js-ln_150 editOrder.bunType: ', editOrder);
	editOrder.pattyType = req.body.pattyType;
	editOrder.cheeseType = req.body.bunType;
	editOrder.firstTopping = req.body.firstTopping;
	editOrder.secondTopping = req.body.secondTopping;
	editOrder.thirdTopping = req.body.thirdTopping;
	editOrder.fourthTopping = req.body.fourthTopping;
	editOrder.sideName = req.body.sideName;
	editOrder.drinkName = req.body.drinkName;
	await editOrder.save((err) => {
		if (err) console.log(err);
		console.log('Order edited');
	});
	// let orders = await Order.find({}).lean();
	// res.render('cart', {orders:orders});
	res.redirect('users/cart');
});

router.post('/cart/:id', async function (req, res, next) {
	let order;
	let orders;
	const id = req.params.id;
	console.log('ln 171 req.body: ', req.body);
	order = await Order.findByIdAndUpdate({ _id: id }, req.body).exec();
	orders = await Order.find({});
	console.log('Edits confirmed!');

	console.log('ln_172 order: ', order);
	res.render('cart', { orders });
});

 // newOrder = await Order.findByIdAndUpdate({
  //   _id: id,
  //   bunType: selectedBun.bunType,
  //   bunPrice: selectedBun.bunPrice,
  //   pattyType: selectedPatty.pattyType,
  //   pattyPrice: selectedPatty.pattyPrice,
  //   cheeseName: selectedCheese.cheeseName,
  //   cheesePrice: selectedCheese.cheesePrice,
  //   firstTopping: selectedFirstTopping.firstTopping,
  //   firstToppingPrice: selectedFirstTopping.toppingPrice,
  //   secondTopping: selectedSecondTopping.secondTopping,
  //   secondToppingPrice: selectedSecondTopping.toppingPrice,
  //   thirdTopping: selectedThirdTopping.thirdTopping,
  //   thirdToppingPrice: selectedThirdTopping.toppingPrice,
  //   fourthTopping: selectedFourthTopping.fourthTopping,
  //   fourthToppingPrice: selectedFourthTopping.toppingPrice,
  //   sideName: selectedSide.sideName,
  //   sidePrice: selectedSide.sidePrice,
  //   drinkName: selectedDrink.drinkName,
  //   drinkPrice: selectedDrink.drinkPrice,
  //   subTotal: orderSubTotal, 
  // });

  /* GET users/edit/id */
// router.post('/editOrder', async function(req, res, next) {
//   const { bunType, pattyType, cheeseType, firstTopping, secondTopping, thirdTopping, fourthTopping, sideName, drinkName, quantity } = req.body;
//   const buns = await Bun.find({});
//   const patties = await Patty.find({});
//   const cheeses = await Cheese.find({});
//   const toppings = await Topping.find({});
//   const sides = await Side.find({});
//   const drinks = await Drink.find({});

//   const selectedBun = await Bun.findOne({bunType: bunType}).exec();
//   const selectedPatty = await Patty.findOne({pattyType: pattyType}).exec();
//   const selectedCheese = await Cheese.findOne({cheeseType: cheeseType}).exec();
//   const selectedFirstTopping = await Topping.findOne({toppingType: firstTopping}).exec();
//   const selectedSecondTopping = await Topping.findOne({toppingType: secondTopping}).exec();
//   const selectedThirdTopping = await Topping.findOne({toppingType: thirdTopping}).exec();
//   const selectedFourthTopping = await Topping.findOne({toppingType: fourthTopping}).exec();
//   const selectedSide = await Side.findOne({sideType: sideName}).exec();
//   const selectedDrink = await Drink.findOne({drinkType: drinkName}).exec();

//   for(let i = 0; i < +quantity; i++){
//     const orderSubTotal = (selectedBun.bunPrice+selectedPatty.pattyPrice+selectedCheese.cheesePrice+selectedFirstTopping.toppingPrice+selectedSecondTopping.toppingPrice+selectedThirdTopping.toppingPrice+selectedFourthTopping.toppingPrice+selectedSide.sidePrice+selectedDrink.drinkPrice);
//     const newOrder = new Order ({
//       bunType: bunType,
//       bunPrice: selectedBun.bunPrice,
//       pattyType: pattyType,
//       pattyPrice: selectedPatty.pattyPrice,
//       cheeseType: cheeseType,
//       cheesePrice: selectedCheese.cheesePrice,
//       firstTopping: firstTopping,
//       firstToppingPrice: selectedFirstTopping.toppingPrice,
//       secondTopping: secondTopping,
//       secondToppingPrice: selectedSecondTopping.toppingPrice,
//       thirdTopping: thirdTopping,
//       thirdToppingPrice: selectedThirdTopping.toppingPrice,
//       fourthTopping: fourthTopping,
//       fourthToppingPrice: selectedFourthTopping.toppingPrice,
//       sideName: sideName,
//       sidePrice: selectedSide.sidePrice,
//       drinkName: drinkName,
//       drinkPrice: selectedDrink.drinkPrice,
//       subTotal: orderSubTotal, 
//     });
//     await newOrder.save();
//   }
//   let orders = await Order.find({}).lean();
//   // res.render('cart', {orders:orders});
  
//     req.session.success = true;
//     res.render('cart', {orders:orders});
// });