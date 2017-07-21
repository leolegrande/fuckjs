var CommandLine = new Object();

var ENTER_KEYCODE_VALUE = 13;
var UP_ARROW_KEYCODE_VALUE = 38;
var DOWN_ARROW_KEYCODE_VALUE = 40;
CommandLine.log = [];
CommandLine.index = 0;

CommandLine.getInput = function(e){
	if (e.keyCode === ENTER_KEYCODE_VALUE){
		console.log("enter was pressed");
		e.preventDefault();
		var input = document.getElementById("command").value;
		if (input.length == 0){
			return false;
		}
		GameManager.turn++;
		document.getElementById("command").value="";
		console.log("handling input: " + input);
		this.log.push(input);
		this.index = this.log.length;
		this.handleInput(input);
		console.log("updating screen");
		GameManager.updateScreen();
	}
	else if (e.keyCode === UP_ARROW_KEYCODE_VALUE){
		this.index--;
		if (this.log.length == 0){
			return false;
		}
		if (this.index < 0){
			this.index = 0;
		}
		console.log("up was pressed");
		e.preventDefault();
		document.getElementById("command").value = this.log[this.index];
	}
	else if (e.keyCode === DOWN_ARROW_KEYCODE_VALUE){
		this.index++;
		if (this.log.length == 0){
			return false;
		}
		if (this.index >= this.log.length){
			this.index = this.log.length;
			document.getElementById("command").value = "";
			return false;
		}
		document.getElementById("command").value = this.log[this.index];
	}
	return false;
}

CommandLine.handleInput = function(input){
	var lowerInput = input.toLowerCase();
	var inputs = lowerInput.split(" ");
	var verb = inputs[0];
	var noun = inputs[inputs.length-1];	
	switch(verb){
	//take
		case "take":
		case "get":
		case "pick":
       		 	this.take(noun);
			break;
	//look
		case "look":
		case "describe":
		case "examine":
		case "inspect":
		case "ls":
			if (inputs.length > 1){
				this.look(noun);
			}
			else {
				this.look();
			}
			break;	

	//die
		case "die":
			this.die();
			break;
		case "kill":
			if (noun == "self"){
				this.die();
			}
			break;
		
	//search
		case "search":
		case "open":
			this.search(noun);
			break;
	//clear
		case "clear": 
			GameManager.clearLog();
			break;
	//help
		case "help":
			this.help();
			break;
	//movement
	
	//north
		case "north":
		case "n":
			this.go("n");
			break;
	//south
		case "south":
		case "s":
			this.go("s");
			break;
	//east
		case "east":
		case "e":
			this.go("e");
			break;
	//west
		case "west":
		case "w":
			this.go("w");
			break;
	//go
		case "go":
		case "cd":
			switch(noun){
				case "north":
					this.go("n");
					break;
				case "south":
					this.go("s");
					break;
				case "east":
					this.go("e");
					break;
				case "west":
					this.go("w");
					break;
				default:
					this.go(noun);
					break;
			}
			break;
	//unlock
		case "unlock":
			this.unlock(noun);
			break;
	//override
		case "override":
			this.override(noun);
			break;
	
	//default
		default:
			GameManager.updateLog("I do not understand " + lowerInput);
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
        if (!container.searched){
            container.search();
            GameManager.updateLog(container.describeSearch());
        }
        else {
            GameManager.updateLog(container.describeItems());
        }
    }
    else if (container instanceof Unlockable){
	if (container.locked){
            GameManager.updateLog(container.describeLocked());
	}
	else if (!container.searched){
		container.search();
		GameManager.updateLog(container.describeSearch());
	}
	else {
		GameManager.updateLog(container.describeSearch());
	}
    }
    else {
        GameManager.updateLog("cannot search " + input);
    }
}

CommandLine.help = function(){
    var help = "<p>Command List:</p><p>describe (noun)</p><p>search (noun)</p><p>take (noun)</p>";
    GameManager.updateLog(help);
}

CommandLine.go = function(ex){
	console.log("going " + ex);
	var nextRoom = GameManager.currentRoom.getExit(ex);
	if (nextRoom == null){
		console.log("exit is null");
		GameManager.updateLog("cannot go that way!");
	}
	else {
		console.log("exit is " + nextRoom.name);
		GameManager.transitionRoom(nextRoom);
	}
}

CommandLine.unlock = function(input){
	var container = GameManager.currentRoom.getContainer(input);
	if (container instanceof Unlockable){
		if (container.locked){
			GameManager.updateLog(container.describeLocked());
		}
		else {
			GameManager.updateLog(input + " is already unlocked");
		}
	}
	else {
		GameManager.updateLog("cannot unlock " + input);
	}
}

CommandLine.override = function(input){
	var container = GameManager.currentRoom.getContainer(input);
	container.unlock();
	GameManager.updateLog(input + " overridden");
	GameManager.updateLog(container.describeUnlock());
}