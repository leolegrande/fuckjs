//test room

//items
var water = new Water("a dirty water bottle");
var bread = new Food("bread", "a moldy piece of bread.", 10, 15);
var key = new Item("key", "a rusty, worn key in the shape of a 4 leaf clover.");
var coin = new Item("coin", "a silver coin, shimmering in the light.");
var sword = new Item("sword", "a wooden sword, looks like a child's toy.");

//containers
var table = new Container("table", "a damaged table with rusted screws still stands strong at the center of the room.", [water, bread]);

//searchables
var fireplace = new Searchable("fireplace", "an extinguished fireplace sits, almost longingly, at the back of the room.", [key, coin]);

var chest = new Searchable("chest", "a royal chest rests within a dark corner of the room. the handle is etched with claw marks.", [sword]);

//room
var testRoom = new Room("a dark cabin", "you are in the main room of a log cabin. there is an extingushed fireplace at the back of the room. a wooden table sits in the center. there is also a chest sitting in a dark corner.", [table, fireplace, chest]);
