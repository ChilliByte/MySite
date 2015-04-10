level1 = {};
level2 = {};
level3 = {};
level4 = {};
//======== Level 1 ==========
level1.boxes = [];
level1.boxes.push({
    x: 0,
    y: 0,
    width: 10,
    height: height
});

level1.boxes.push({
    x: 0,
    y: height/2,
    width: width,
    height: height/2
});

level1.collectibles = [];
level1.mobs = [];
//========= Level 2 =====================
level2.boxes = [];

level2.boxes.push({
    x: 0,
    y: height/2 + 10,
    width: width/2,
    height: height/2
});

level2.boxes.push({
    x: width/2
    y: height/2 - 20,
    width: width/2,
    height: height/2 + 20
});


level2.collectibles = [];

level2.collectibles.push({
    x: width/2 + 20,
    y: height/2 - 30,
    width: 10,
    height: 10,
    collected: false
});

level2.mobs = [];
//========== Level 3 ==========
level3.boxes = [];

level3.boxes.push({
    x: 0,
    y: height/2 + 10,
    width: width,
    height: height/2
});

level3.boxes.push({
    x: 50,
    y: height/2 - 40,
    width: width - 40,
    height: height/2 - 40
});

level3.boxes.push({
    x: 100,
    y: height/2 - 90,
    width: width - 100,
    height: height/2 - 90
});


level3.collectibles = [];

level3.collectibles.push({
    x: 140,
    y: height/2 - 100,
    width: 10,
    height: 10,
    collected: false
});

level3.mobs = [];

level3.mobs.push({
    x: 240,
    y: 10,
    width: 10,
    height: 10,
    speed: 0.3,
    velX: 0,
    velY: 0,
    type: "patrol",
    x1Limit: 140,
    x2Limit: 340,
    collisionDir : "",
    grounded: false,
    hitPlayer: "",
    dead: false
});

//====== Level 4=======
level4.boxes = [];

level4.boxes.push({
    x: 0,
    y: height/2 + 10,
    width: width,
    height: height/2
});


level4.collectibles = [];

