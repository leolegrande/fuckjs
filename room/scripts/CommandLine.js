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
		GameManager.turn += 1;
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
	if (inputs[0] === "take" || inputs[0] === "get" || input.startsWith("pick up")){
        this.take(inputs[inputs.length-1]);
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
    else if(inputs[0] === "search" || inputs[0] === "open"){
        this.search(inputs[1]);
    }
    else if(inputs[0] === "clear"){
        GameManager.clearLog();
    }
	else {
		GameManager.updateLog("I do not understand " + inputs.join(" "));
	}
}

CommandLine.look = function(input=""){
    if (input.length == 0 || input == "room"){
        var description = GameManager.currentRoom.describe();
        GameManager.updateLog(description);
    }
    else {
        var obj = GameManager.currentRoom.getContainer(input);
        if (obj == null){
            obj = GameManager.currentRoom.getItem(input);
        }
        if (obj == null){
            GameManager.updateLog("there's no " + input + " to look at!");
        }
        else {
            GameManager.updateLog(obj.describe());
        }
    }
}

CommandLine.take = function(input){
    var item = GameManager.currentRoom.removeItem(input);
    if (item == null){
        GameManager.updateLog("there is no " + input + " to take!");
    }
    else {
        Player.addItem(item);
        GameManager.updateLog("took " + input);
    }
}

CommandLine.die = function(){
    Player.takeDamage(100);
}

CommandLine.search = function(input){
    var container = GameManager.currentRoom.getContainer(input);
    if (container instanceof Searchable){
        container.search();
        GameManager.updateLog(container.describeItems());
    }
    else {
        GameManager.updateLog("cannot search " + input);
    }
}
