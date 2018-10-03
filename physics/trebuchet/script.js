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
    Constraint = Matter.Constraint,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var ground = Bodies.rectangle(400, 600, 820, 40, { isStatic: true });
var base = Bodies.rectangle(200, 568, 300, 12);
var upright = Bodies.rectangle(196, 489, 12, 198);
var baseConstraint = Constraint.create({
        bodyA:base,
        bodyB:upright,
        damping:0.1,
        length:105
});
Trebuchet.body = Body.create({
        parts: [base, upright]
    });

// add all of the bodies to the world
World.add(engine.world, [ground,Trebuchet.body]);

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
