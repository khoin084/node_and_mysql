//include the Update_db module
var Update = require('./Update_db');

function OrderAdmin (item_id, how_many) {
	this.item_id = item_id;
	this.how_many = how_many;

	this.connectServer = function () {
		var connect = new Update();
		connect.startConnection();
	}
	this.displayItems = function () {
		var newDisplay = new Update();
		newDisplay.getItemsToDisplay();
	};
	this.makeOrder = function (id) {
		var newUpdate = new Update(this.item_id, this.how_many);
		newUpdate.getItemToBuy();
	};
}

module.exports = OrderAdmin;