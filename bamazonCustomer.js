//include the Order module
var OrderAdmin = require('./OrderAdmin');
//include inquirer package to prompt the user for inputs
var inquirer = require('inquirer');
//Start by displaying all of the items available for sale.
var items = new OrderAdmin();
items.connectServer();

function start () {
	//displaying available items for user.
	items.displayItems();
	//adding 250ms delay before invoking whichProduct() method, else it'll 
	//run before the call back has a chance to complete - asynchronocity.
	setTimeout(function(){ askQuestions(); }, 250);
}

function askQuestions() {
	inquirer.prompt([
	{
		name: "idProduct",
		type: "input",
		message: "Please enter the ID of the product you'd like to purchase.",
		validate: function(value) {
	      if (isNaN(value) === false) {
	        return true;
	      }
	      console.log("\nPlease enter an integer value:")
	      return false;
    	},
    },
    {
		name: "numUnits",
		type: "input",
		message: "How many units would you like to purchase?",
		validate: function(value) {
	      if (isNaN(value) === false) {
	        return true;
	      }
	      console.log("\nPlease enter an integer value:")
	      return false;
	  	}
	}
	]).then(function(answer) {
	    var newOrder = new OrderAdmin(answer.idProduct, answer.numUnits);
	    newOrder.makeOrder();
	});
}

//kicktart the program
start();

exports.start = start;