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

//

function Container(name, description, items){
	Item.call(this, name, description);
	this.items = items();
	this.describeItems(){
		var result += "<p>Inside the " + this.name + "is:</p>";
		for (var i=0; i<this.items.length; i++){
			var result += this.items[i].describe();
		}
		return result;
	}
	this.describeFull() = function(){
		return this.describe() + this.describeItems();
	}
}

function Searchable(name, description, items){
	Container.call(this, name, description, items);
	this.searched = False;
	this.describeSearchable = function(){
		if (searched){
			return this.describeFull();
		}
		else{
			return this.describe();
		}
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