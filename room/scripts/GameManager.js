var GameManager = new Object();

GameManager.currentRoom = testRoom;
GameManager.textLog = []//5 most recent text logsj

//accepts string, updates text log with most recent logs
GameManager.updateLog = function(text) {
	console.log("updating log");
	this.textLog.unshift(text);
	console.log("finished updating log");
}

GameManager.gameOver = function() {
	console.log("game over");
	this.updateLog("you have died.");
	
}

//displays all data on the screen
GameManager.updateScreen = function(){
	console.log("updating screen");
    //resetting logs;
	document.getElementById("log").innerHTML = "";
	console.log("getting textlogs");
    //getting logs
	for (var i=this.textLog.length-1; i>=0; i--){
		document.getElementById("log").innerHTML += "<p>" + this.textLog[i] + "</p><br>";
	}
	var objDiv = document.getElementById("log");
	objDiv.scrollTop = objDiv.scrollHeight;
	console.log("finished getting textLogs");
    //getting room name
    console.log("getting room name");
	document.getElementById("room").innerHTML = "<h1>" + this.currentRoom.toString() + "</h1>";
	console.log("room name: " + this.currentRoom.toString());
    //getting inventory
    console.log("getting inventory");
    document.getElementById("items").innerHTML = Player.invToString();
    console.log("inventory: " + Player.invToString());
    console.log("getting stats");
    document.getElementById("stats").innerHTML = Player.statsToString();
    console.log("finished updating screen");
}
