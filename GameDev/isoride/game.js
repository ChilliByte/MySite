var iso = new Isomer(document.getElementById("game"));
var Point  = Isomer.Point;
var Path   = Isomer.Path;
var Shape  = Isomer.Shape;
var Vector = Isomer.Vector;
var Color  = Isomer.Color;

var iso = new Isomer(document.getElementById("canvas"));

var yellow = new Color(190, 180, 50);
var blue = new Color(50, 60, 160);

iso.add(Shape.Prism(Point.ORIGIN, 3, 3, 1),yellow);
iso.add(Shape.Prism(Point(2, 0, 1)), blue);
