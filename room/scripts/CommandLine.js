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
		GameManager.turn++;
		document.getElementById("command").value="";
		console.log("handling input: " + input);
		this.handleInput(input);
		console.log("updating screen");
		GameManager.updateScreen();
		document.cookie="cookiename=Foo Bar";
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
    else {
        GameManager.updateLog("cannot search " + input);
    }
}

CommandLine.help = function(){
    var help = "<p>Command List:</p><p>describe (noun)</p><p>search (noun)</p><p>take (noun)</p>";
    GameManager.updateLog(help);
}
