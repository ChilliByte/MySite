console.log("loaded");

var Trebuchet = {
    uprightSetting:1,
    armSetting:1,
    armHole:1,
    mass:1,
    springConstant:1
}

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(50, 598, 300, 12);
var boxB = Bodies.rectangle(200, 400, 12, 198);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

var gui = new dat.GUI();
gui.add(Trebuchet, "uprightSetting");
gui.add(Trebuchet, "armSetting");
gui.add(Trebuchet, "armHole");
gui.add(Trebuchet, "mass");
gui.add(Trebuchet, "springConstant");
