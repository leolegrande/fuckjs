function Container(name, description, items){
    this.name = name;
    this.description = description;
	this.items = items;

    this.describeContainer = function(){
        return "<p>" + this.description + "</p>";
    }
	this.describeItems = function(){
		var result = "<p>Inside the " + this.name + " contains:</p>";
		for (var i=0; i<this.items.length; i++){
			result += this.items[i].describe();
		}
		return result;
	}
	this.describe = function(){
		return this.describeContainer() + this.describeItems();
	}
}

function Searchable(name, description, items){
	Container.call(this, name, description, items);
	this.searched = false;
    this.describe = function(){
        if (this.searched){
            return this.describeContainer() + this.describeItems();
        }
        else {
            return this.describeContainer();
        }
    }
    this.search = function(){
        this.searched = true;
    }
}

