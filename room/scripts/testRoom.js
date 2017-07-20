//test room
//descriptions

//item desc
var waterDesc = "a dirty water bottle";
var breadDesc = "a moldy piece of bread";
var keyDesc = "a rusty, worn key in the shape of a four leaf clover";
var coinDesc = "a silver coin, shimmering in the light.";
var swordDesc = "a wooden sword. looks like a child's toy";
var tableDesc = "a damaged table with rusted screws still stands strong at the center of the room";
var bearDesc = "a ragged toy bear. its beady eyes peer into your very soul. his name is mr. fuzzles.";

//container desc
var fireplaceDesc = "an extinguished fireplace hides sheepishly at the back of the room";
var chestDesc = "a royal chest rests within a dark corner of the room. the handle is etched with claw marks";
var roomDesc = "you are in the livingroom of a log cabin.</p><p> there is an extingushed fireplace at the back of the room.</p><p> a wooden table sits in the center.</p><p> there is also a chest sitting in a dark corner</p><p>to the east is a door leading to the bedroom.";
var bedRoomDesc = "you find yourself in the bedroom of the cabin.</p><p>a queen-sized bed with pearly-white satin sheets glistens from the moonlight coming from the window haunting above it.</p><p>an armoire sits on the south side of the room, its handles wrapped tightly with a rope, shut tight.</p><p>to the west is a door, leading to the livingroom.";
var bedDesc = "the satin sheets of the bed glisten in the moonlight. the bed is unmade, and there is warmth radiating from a depression on the left side of the mattress.";
var armoireDesc = "the wooden doors of the armoire are etched with exotic patterns. a rope is tightened around the handles. there is no use trying to open it without some sort of knife.";

//searchable desc
var fireSearch = "sifting through the soot, you find a few hidden items.";
var bedSearch = "you get on all floors and peer underneath the bed. two beady eyes look back at you, and your heart drops.</p><p>after a fearful moment, you realize that it's just a teddy bear.";
var chestSearch = "the chest creaks as you lift the top, releasing a musty smell.";

//items
var water = new Water(waterDesc);
var bread = new Food("bread", breadDesc, 10, 15);
var key = new Item("key", keyDesc);
var coin = new Item("coin", coinDesc);
var sword = new Item("sword", swordDesc);
var bear = new Item("toy bear", bearDesc);

//containers
var table = new Container("table", tableDesc, [bread]);
var armoire = new Item("armoire", armoireDesc, []);

//searchables
var fireplace = new Searchable("fireplace", fireplaceDesc, fireSearch, [key, coin]);
var bed = new Searchable("bed", bedDesc, bedSearch, [bear]);
var chest = new Searchable("chest", chestDesc, chestSearch, [sword]);

//room
var testRoom = new Room("a dark cabin", roomDesc, [table, fireplace, chest]);
var testRoom2 = new Room("a dark bedroom", bedRoomDesc, [bed, armoire]);

//setting exits
testRoom.setExits([null, null, testRoom2, null]);
testRoom2.setExits([null, null, null, testRoom]);