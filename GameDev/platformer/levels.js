//Begin Levels
levels = [];
level1 = {};
levels.push(level1);
level2 = {};
levels.push(level2);
level3 = {};
levels.push(level3);
level4 = {};
levels.push(level4);
level5 = {};
levels.push(level5);
//Level1
level1.boxes = [];
level1.boxes.push({
    x: -10,
    y: 0,
    width: 10,
    height: 40*units
});
level1.boxes.push({
    x: -10*units,
    y: 16*units,
    width: 80 * units,
    height: 20 * units
});
level1.boxes.push({
    x: 3*units,
    y: 13*units,
    width: units,
    height: units
});
level1.collectibles = [];
level1.mobs = [];
// Level 2
level2.boxes = [];
level2.boxes.push({
    x: -10 * units,
    y: 16*units,
    width: 32*units,
    height: 20*units
});
level2.boxes.push({
    x: 22*units,
    y: 13*units,
    width: 30*units,
    height: 40*units
});
level2.collectibles = [];
level2.mobs = [];
//Level 3
level3.boxes = [];
level3.boxes.push({
    x: -10 * units,
    y: 13 * units,
    width: 30*units,
    height: 20*units
});
level3.boxes.push({
    x: 15*units,
    y: 10*units,
    width: 10*units,
    height: 20 * units
});
level3.boxes.push({
    x: 25*units,
    y: 14*units,
    width:15*units,
    height: 20*units
});
level3.collectibles = [];
level3.collectibles.push({
    x: 26*units,
    y: 13 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level3.collectibles.push({
    x: 30*units,
    y: 13*units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level3.collectibles.push({
    x: 34 * units,
    y: 13 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level3.mobs = [];
// Level 4
level4.boxes = [];
level4.boxes.push({
    x: -10 * units,
    y: 14*units,
    width: 28*units,
    height: 20*units
});
level4.boxes.push({
    x: 19 * units,
    y: 11*units,
    width: 3*units,
    height: units
});
level4.boxes.push({
    x: 18 * units,
    y: 15*units,
    width: 7*units,
    height: 20*units
});
level4.boxes.push({
    x: 28 * units,
    y: 9*units,
    width: 3*units,
    height: units
});
level4.boxes.push({
    x: 25 * units,
    y: 16*units,
    width: 5*units,
    height: 20*units
});
level4.boxes.push({
    x: 37 * units,
    y: 7*units,
    width: 13*units,
    height: units
});
level4.boxes.push({
    x: 30 * units,
    y: 17*units,
    width: 10*units,
    height: 20*units
});
level4.collectibles = [];
level4.collectibles.push({
    x: 11 * units,
    y: 13 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level4.collectibles.push({
    x: 20.5 * units,
    y: 10 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level4.collectibles.push({
    x: 29 * units,
    y: 8 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level4.collectibles.push({
    x: 30 * units,
    y: 8 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level4.collectibles.push({
    x: 37.5 * units,
    y: 6 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level4.collectibles.push({
    x: 38.5 * units,
    y: 6 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level4.collectibles.push({
    x: 39.5 * units,
    y: 6 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level4.mobs = [];
//Level5
level5.boxes = [];
level5.boxes.push({
    x: -10 * units,
    y: 17*units,
    width: 14*units,
    height: 20*units
});
level5.boxes.push({
    x: 4*units,
    y: 15*units,
    width: 4 * units,
    height: 20 * units
});
level5.boxes.push({
    x: 8*units,
    y: 13*units,
    width: 4 * units,
    height: 20 * units
});
level5.boxes.push({
    x: 12*units,
    y: 11*units,
    width: 4 * units,
    height: 20 * units
});
level5.boxes.push({
    x: 16*units,
    y: 9*units,
    width: 4 * units,
    height: 20 * units
});
level5.boxes.push({
    x: 20*units,
    y: 7*units,
    width: 20 * units,
    height: 20 * units
});
level5.boxes.push({
    x: -10*units,
    y: 7*units,
    width: 20 * units,
    height: units
});
level5.collectibles = [];
level5.collectibles.push({
    x: 8 * units,
    y: 6 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level5.collectibles.push({
    x: 2 * units,
    y: 16 * units,
    type: "coin",
    width: (units/5)*2,
    height: (units/5)*2,
    collected: false
});
level5.mobs = [];
level5.mobs.push({
    x: 28*units,
    y: 6*units,
    width: (units/8)*7,
    height: (units/8)*7,
    speed: 0.3,
    velX: 0,
    velY: 0,
    type: "patrol",
    x1Limit: 22*units,
    x2Limit: 34*units,
    collisionDir: "",
    grounded: false,
    hitPlayer: "",
    dead: false
});
// End Levels
