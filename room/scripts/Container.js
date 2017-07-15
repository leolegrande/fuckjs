//Contains items
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

    this.getItemIndex = function(item){
        for (var i=0; i<this.items.length; i++){
            if (this.items[i].name === item){
                return i;
            }
        }
        return -1;
    }
    
    this.removeItem = function(index){
        var itemArr = this.items.splice(index, 1);
        return itemArr[0];
    }
}    
//Contains items, but must be searched first to describe and interact with items
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
        return false;
    }
}
