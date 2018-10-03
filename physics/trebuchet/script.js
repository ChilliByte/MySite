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
var ground = Bodies.rectangle(-10, 580, 820, 60, { isStatic: true });
var base = Bodies.rectangle(50, 568, 300, 12);
var upright = Bodies.rectangle(200, 370, 12, 198);

// add all of the bodies to the world
World.add(engine.world, [ground,base,upright]);

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
