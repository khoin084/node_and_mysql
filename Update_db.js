//include mysql package
var mysql = require("mysql");
var bamazonCustomer = require("./bamazonCustomer");
//global connection variable to be accessed with other methods in constructor.
var connection = null;

function Update_db (item_id, how_many) {
	this.item_id = item_id;
	this.how_many = how_many;

	this.startConnection = function() {
		// create the connection information for the sql database
		connection = mysql.createConnection({
		  host: "localhost",
		  port: 3306,

		  // Your username
		  user: "root",

		  // Your password
		  password: "",
		  database: "Bamazon"
		});

		// connect to the mysql server and sql database
		connection.connect(function(err, items) {
		  if (err) throw err;
		  console.log("Connected to MySQL.");
		});
	};
	//method to diplay available products by id.
	this.getItemsToDisplay = function() {
		connection.query("SELECT item_id, product_name FROM products", function(err, items) {
	      if (err) throw err;
	      console.log("======================================================");
	      console.log("Items available for purchase.");
	      console.log("======================================================");
	      //loop to cycle through product list.
	      for(var i = 0; i < items.length; i++) {	
	      	console.log(items[i].item_id + " " + items[i].product_name);
	      }
	      console.log("======================================================");
	    });
	};
	//method that RETREIVES the product stock_quantity number.
	this.getItemToBuy = function () {
		//maintain context to object Update_db
		var self = this;
		var remaining;
		connection.query("SELECT stock_quantity FROM products WHERE ?",
		{
			item_id: self.item_id
		}, 
		function (err, results) {
			if(err) throw err;
			remaining = results[0].stock_quantity - self.how_many;
			//conditional to determine if order should be made.
			if(results[0].stock_quantity < parseInt(self.how_many)){
				console.log("+++++++++++++++++++++++++++++++++");
				console.log("Insufficient quantity!!!");
				console.log("+++++++++++++++++++++++++++++++++");
				bamazonCustomer.start();
			}
			else{
				//Sufficient quantity Update DB!!!
				self.addRowData(remaining);
			}
		});
	};
	//method with an arguement equal to the delta of the desired 
	//purchase number and that of the quantity in stock.
	this.addRowData = function (remaining) {
		//update the stock_quantity witht the delta of user purchase and current inventory.
		connection.query("UPDATE products SET ? WHERE ?", [{
	    	stock_quantity: remaining
	    },
	    {
	    	item_id: this.item_id
		}], function(err) {
	      	if (err) throw err;
	      	console.log("+++++++++++++++++++++++++++++++++");
	      	console.log("Your DB updated successfully!");
	      	console.log("+++++++++++++++++++++++++++++++++");
	      	bamazonCustomer.start();
	    });
	};
}

module.exports = Update_db;