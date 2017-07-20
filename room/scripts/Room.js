function Room(name, description, containers){
    this.name = name;
    this.description = description;
    this.containers = containers;
    this.exits = {
        "n": null,
        "s": null,
        "e": null,
        "w": null
    }

    this.setExits = function(ex){
        this.exits["n"] = ex[0];
        this.exits["s"] = ex[1];
        this.exits["e"] = ex[2];
        this.exits["w"] = ex[3];
    }

    this.getExit = function(ex){
	return this.exits[ex];
    }
    this.toString = function(){
        return this.name;
    }

    this.describe = function(){
        console.log("describing room");
        result = "";
        result += "<p>" + this.description +"</p>";
        console.log("room description: " + result);
        return result;
    }

    this.getContainerIndex = function(container){
        for (var i=0; i<this.containers.length; i++){
            if (this.containers[i].name === container){
                return i;
            }
        }
        return -1;
    }

    this.getContainer = function(container){
        var index = this.getContainerIndex(container);
        if (index == -1){
            return null;
        }
        else {
            return this.containers[index];
        }
    }

    this.getItem = function(item){
        var index;
        for (var i=0; i<this.containers.length; i++){
            item = this.containers[i].getItem(item);
            if (item != null){
                return item;
            }
        }
        return null;
    }
    this.removeItem = function(input){
        var item;
        for (var i=0; i<this.containers.length; i++){
            item = this.containers[i].getItem(input);
            if (item != null){
                return this.containers[i].removeItem(input);
            }
        }
        return null;
    }
}