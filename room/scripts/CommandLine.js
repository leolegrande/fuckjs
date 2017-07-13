var CommandLine = new Object();

CommandLine.getInput = function(e){
	if (e.keyCode === 13){
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
		console.log("feeding " + inputs[1] + " to Room.giveItem()");
		GameManager.currentRoom.giveItem(inputs[1]);
	}
	else if (inputs[0] === "look"){
		console.log("looking");
		GameManager.updateLog(GameManager.currentRoom.describe());
	}
	else if(inputs[0] === "die"){
		console.log("dying");
		Player.takeDamage(100);
	}
	else {
		console.log("I do not understand " + inputs.join(" "));
	}
}