function Room(name, items, description, searchables){
	this.name = name;
	this.items = items;
	this.description = description;
    this.searchables = searchables;
	this.toString = function(){
		return this.name;
    }
	this.describe = function(){
		console.log("describing room")
		result = "";
		result += "<p>" + this.description +"</p>"
		console.log("room description: " + result);
		for (var i=0; i<this.items.length; i++){
			result += this.items[i].describe();
		}
		console.log("room + item description: " + result);
        for (i=0; i<this.searchables.length; i++){
            result += this.searchables[i].describe();
        }
		return result;
	}
	this.getItemIndex = function(item){
        	for (var i=0; i<this.items.length; i++){
			if (this.items[i].name === item){
                		return i;
            		}
        	}
        return -1;
	}
    this.getSearchableIndex = function(searchable){
        for (var i=0; i<this.searchables.length; i++){
            if (this.searchables[i].name === searchable){
                return i;
            }
        }
        return -1;
    }

    this.removeItem = function(index){
        var itemArr = this.items.splice(index, 1);
        return itemArr[0];
    }

    this.getSearchable = function(index){
        return this.searchables[index];
    }
}

var water1 = new Water("There is a botte of water on the wooden table in the center of the room.");
var water2 = new Water("There is a water bottle in the right corner.");
var bread = new Food("bread", "There is a piece of bread hanging by a string in the middle of the room", 10, 15);
var key = new Item("key", "a rusty, worn key in the shape of a 4 leaf clover.");
var coin = new Item("coin", "a silver coin, shimmering in the light.");
var sword = new Item("sword", "a wooden sword, looks like a child's toy.");
var fireplace = new Searchable("fireplace", "an extinguished fireplace sits, almost longingly, at the center of the room.", [key, coin]);
var chest = new Searchable("chest", "a royal chest rests within a dark corner of the room.", [sword]);
var testRoom = new Room("a dark cabin", [bread, water1, water2], "You are in the main room of a log cabin. There is an extingushed fireplace in the corner.", [fireplace, chest]);
