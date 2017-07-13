function Room(name, items, description){
	this.name = name;
	this.items = items;
	this.description = description;
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
		return result;
	}
	this.getItemIndex = function(item){
		var getItem;
        	for (var i=0; i<this.items.length; i++){
			if (items[i].name === item){
                		return i;
            		}
        	}
        return -1;
	}

    this.giveItem = function(item){
        console.log("checking item index");
        var index = this.getItemIndex(item)
        console.log("item index is" + index);
        if (index === -1){
            console.log("item not in room!");
            return false;
        }
        else {
            var takenItem = this.items.splice(index, 1);
            console.log("feeding " + takenItem[0].name + " to Player.addItem()");
            Player.addItem(takenItem[0]);
        }
	
    }
}

var water1 = new Water("There is a botte of water on the wooden table in the center of the room.");
var water2 = new Water("There is a water bottle in the right corner.");
var bread = new Food("bread", "There is a piece of bread hanging by a string in the middle of the room", 10, 15);
var testRoom = new Room("a dark cabin", [bread, water1, water2], "You are in the main room of a log cabin. There is an extingushed fireplace in the corner.");
