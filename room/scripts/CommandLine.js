var CommandLine = new Object();

var ENTER_KEYCODE_VALUE = 13;

CommandLine.getInput = function(e){
	if (e.keyCode === ENTER_KEYCODE_VALUE){
		console.log("enter was pressed");
		e.preventDefault();
		var input = document.getElementById("command").value;
		if (input.length == 0){
			return false;
		}
		document.getElementById("command").value="";
		console.log("handling input: " + input);
		this.handleInput(input);
		console.log("updating screen");
		GameManager.updateScreen();
	}
	return false;
}

CommandLine.handleInput = function(input){
	var lowerInput = input.toLowerCase();
	var inputs = lowerInput.split(" ");
	if (inputs[0] === "take"){
        this.take(inputs[1]);
	}
	else if (inputs[0] === "look" || inputs[0] === "describe" || inputs[0] === "examine" || inputs[0] === "inspect"){
        if (inputs.length > 1){
            this.look(inputs[1]);
        }
        else {
            this.look();
        }
	}
	else if(inputs[0] === "die"){
        this.die();
	}
    else if(inputs[0] === "search"){
        this.search(inputs[1]);
    }
    else if(inputs[0] === "clear"){
        GameManager.clearLog();
    }
	else {
		console.log("I do not understand " + inputs.join(" "));
	}
}

CommandLine.look = function(input=""){
    if (input.length == 0){
        var description = GameManager.currentRoom.describe();
        GameManager.updateLog(description);
    }
    else {
        var itemIndex = GameManager.currentRoom.getItemIndex(input);
        var searchableIndex = GameManager.currentRoom.getSearchableIndex(input);
        if (itemIndex == -1 && searchableIndex == -1){
            GameManager.updateLog("No " + input + " found.");
        }
        else if (itemIndex > 0) {
            GameManager.updateLog(GameManager.currentRoom.getItem(itemIndex).describe());
        }
        else {
            GameManager.updateLog(GameManager.currentRoom.getSearchable(searchableIndex).describe());
        }
    }
}

CommandLine.take = function(input){
    var itemIndex = GameManager.currentRoom.getItemIndex(input);
    if (itemIndex == -1){
        GameManager.updateLog(input + " not in room!");
    }
    else {
        var takenItem = GameManager.currentRoom.removeItem(itemIndex);
        Player.addItem(takenItem);
        GameManager.updateLog("took " + takenItem.name);
    }
}

CommandLine.die = function(){
    Player.takeDamage(100);
}

CommandLine.search = function(input){
    var index = GameManager.currentRoom.getSearchableIndex(input);
    if (index == -1){
        GameManager.updateLog(input + " not in room!");
    }
    else {
        var searchable = GameManager.currentRoom.getSearchable(index);
        searchable.search();
        GameManager.updateLog(searchable.describeItems());
    }
}
