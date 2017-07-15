function Room(name, description, containers){
    this.name = name;
    this.description = description;
    this.containers = containers;

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
        for (var i=0; i<this.length; i++){
            if (this.searchables[i].name === searchable){
                return i;
            }
        }
        return -1;
    }

    this.getContainer = function(index){
        return this.containers[index];
    }

    this.getSearchable = function(index){
        return this.searchables[index];
    }
}
