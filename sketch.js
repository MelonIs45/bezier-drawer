document.addEventListener('contextmenu', event => event.preventDefault());

var bezierCurve;

var mouseDrag;
var mousePress;
var mouseRel;

function setup() {
    bezierCurve = new Bezier([
        new Handle(200, 600),
        new Handle(200, 800),
        new Handle(400, 800)
    ]);
    
    createCanvas(1500, 1000);
}

function draw() {
    background(255);
    stroke(0);
    fill(255, 255, 255);

    bezierCurve.Update(mouseDrag, mousePress, mouseRel);
    bezierCurve.Show();
    
    bezierCurve.CalcPoints();
}

function mousePressed() {
    if (mouseButton === LEFT) {
        mousePress = true;
        mouseRel = false;
    } else if (mouseButton === RIGHT) {
        let onPoint = bezierCurve.IsOnPoint();
        
        if (!onPoint) {
            bezierCurve.Points.splice(bezierCurve.Points.length - 1, 0, new Handle(mouseX, (mouseY * -1) + height));
        } else {
            bezierCurve.Points.splice(onPoint, 1);
        }
    }
}

function mouseDragged() {
    mouseDrag = true;
    mouseRel = false;
}

function mouseReleased() {
    mouseRel = true;
    mouseDrag = false;
    mousePress = false;
}