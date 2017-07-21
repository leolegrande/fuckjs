var GameManager = new Object();

GameManager.currentRoom = testRoom;
GameManager.textLog = ["you wake up in a dark room."];
GameManager.turn = 0;
GameManager.helpText = "";
GameManager.cookie = document.cookie="cookiename=Foo Bar";
GameManager.commandLog = [];
GameManager.commandIndex = 0;

//accepts string, updates text log with most recent logs
GameManager.updateLog = function(text) {
	console.log("updating log");
	this.textLog.unshift(text);
	console.log("finished updating log");
}

GameManager.getCommands = function(){
	return this.commandLog;
}

GameManager.getCommandIndex = function(){
	return this.commandIndex;
}

GameManager.updateCommands = function(text){
	console.log("updating commands");
	this.commandLog.push(text);
	console.log("finished updating commands");
}

GameManager.clearLog = function(){
    this.textLog = [];
}

GameManager.gameOver = function() {
	console.log("game over");
	this.updateLog("you have died.");
	document.getElementById("command").disabled = true;
	document.body.style.backgroundColor = "#8b0000";
	
}

//displays all data on the screen
GameManager.updateScreen = function(){
	console.log("updating screen");
    //resetting logs;
	document.getElementById("log").innerHTML = "";
    //getting logs
	this.pullLogs();
    //getting room name
	this.pullRoom();
    //getting inventory
	this.pullInventory();
	this.pullHelp();
}


GameManager.fadeText = function(id, time, op){
	var elem = document.getElementById(id);
	setTimeout(function() {
		elem.style.opacity = op;
	}, time);
}

GameManager.pullLogs = function(){
	console.log("getting text logs");
	var objDiv = document.getElementById("log");
	for (var i=this.textLog.length-1; i>=0; i--){
		objDiv.innerHTML += "<p>" + this.textLog[i] + "</p><br>";
	}
	objDiv.scrollTop = objDiv.scrollHeight;
	console.log("finished getting textLogs");
}

GameManager.pullRoom = function(){
	if (this.turn > 0){
		this.fadeText("room", 3000, 1);
	}
	console.log("getting room info");
	document.getElementById("room").innerHTML = "<h1>" + this.currentRoom.toString() + "</h1>";
	console.log("room name: " + this.currentRoom.toString());
}

GameManager.pullInventory = function(){
	console.log("getting inventory");
	if (Player.inventory.length > 0){
		document.getElementById("inventory").style.opacity = 1;
		document.getElementById("items").innerHTML = Player.invToString();
		console.log("inventory: " + Player.invToString());
	}
	else {
		document.getElementById("inventory").style.opacity = 0;
	}
}

GameManager.pullHelp = function(){
	console.log("getting help text");
	var help = document.getElementById("help");
	if (this.turn == 0){
		this.changeHelp("type 'describe room'");
	}
	else if (this.turn == 1){
		this.changeHelp("type 'search fireplace'");
	}
	else if (this.turn == 2){
		this.changeHelp("type 'help' for more commands");
	}
	else {
		this.changeHelp(this.helpText);
	}
}

GameManager.changeHelp = function(str=""){
	this.fadeText("help", 500, 0);
	setTimeout(function() {document.getElementById("help").innerHTML = str;}, 3000);
	this.fadeText("help", 5000, .4);
}

GameManager.debugStart = function(){
	this.updateScreen();
	this.fadeText("log", 1, 1);
	this.fadeText("command", 1, 1);
}

GameManager.startGame = function(){
	this.updateScreen();
	this.fadeText("log", 3000, 1);
	this.fadeText("command", 7000, 1);
}

GameManager.transitionRoom = function(room){
	this.clearLog();
	this.currentRoom = room;
	this.updateLog(this.currentRoom.describe());
}