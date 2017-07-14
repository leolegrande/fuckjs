var Player = new Object();

Player.name = "grandspaghetti";
Player.inventory = [];
Player.invCap = 20;
Player.health = 100;
Player.hunger = 0;
Player.thirst = 0;

// returns index of item in inventory, return -1 if not found
Player.itemIndex = function(item){
	for (var i=0; i<this.inventory.length; i++){
		console.log("inventory[i][0].name: " + this.inventory[i][0].name);
		console.log("item.name: " + item.name);
		if (this.inventory[i][0].name===item.name){

			console.log("item index: " + i.toString());
			return i;
		}
	}
	console.log("item index: -1");
	return -1;
}


// subtracts damage from player's health

Player.takeDamage = function(damage){
	console.log("taking damage");
	this.health -= damage;
	if (this.health <= 0){
		this.health = 0;
		GameManager.gameOver();
	}
}

// adds hp to player's health
Player.heal = function(hp){
	this.health += hp;
	if (this.health > 100){
		this.health = 100
	}
}		



//adds item to inventory
Player.addItem = function(item){
	console.log("adding " + item.name);
	var index = this.itemIndex(item);
	if (index == -1){
		this.inventory.push([item, 1]);
		console.log("pushed " + item.name + " to inventory");
	}
	else {
		this.inventory[index][1] += 1;
	}
	GameManager.updateLog("Took " + item.name);
}


//returns string representation of inventory in html

Player.invToString = function(){
	result = "";
	for (var i=0; i<this.inventory.length; i++){
		result += "<p>" + this.inventory[i][0].name + " x" + this.inventory[i][1].toString() + "</p>";
	}
	return result;

}



//returns string rep of status in html
Player.statsToString = function(){
	result = "";
	result += "<p>health: " + Player.health.toString() + "</p>";
	result += "<p>hunger: " + Player.hunger.toString() + "</p>";
	result += "<p>thirst: " + Player.thirst.toString() + "</p>";
	return result;

}
