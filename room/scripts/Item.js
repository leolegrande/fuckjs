function Item(itemName, description){
	this.name = itemName;
	this.description = description;
        this.toString = function(){
                return this.name;
	}
	this.describe = function(){
		return "<p>" + this.description + "</p>";
	}
}

function Consumable(itemName, description, verbs, heal){
	Item.call(this, itemName, description);
	this.heal = heal;
	this.verbs = verbs;
	this.use = function(){
		Player.heal(this.heal);
	}
}

function Drink(itemName, description, verbs, heal, thirst){
	Consumable.call(this, itemName, description, verbs, heal);
	this.thirst = thirst;
}

function Food(itemName, description, verbs, heal, hunger){
	Consumable.call(this, itemName, description, verbs, heal);
	this.hunger = hunger;
}

function Water(description){
	Drink.call(this, "water", description, ["drink", "use", "consume"], 10, 30);
}

function Bread(description){
	Food.call(this,"bread", description, ["eat", "use", "consume"], 10, 30);
}
