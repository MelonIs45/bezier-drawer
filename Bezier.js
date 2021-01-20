
class Bezier {
    constructor(points) {
        this.Points = points;
        this.DrawingPoints = [];
        this.NumPoints = 100;
        
        this.CalcPoints();
    }

    CalcPoints() {
        this.DrawingPoints = [];
        var interval = 1 / this.NumPoints;
        var t = interval;

        this.DrawingPoints.push(this.CalcNewPoint(0));

        for (let i = 0; i < this.NumPoints; i++) {
            this.DrawingPoints.push(this.CalcNewPoint(t));
            t += interval;
        }
    }

    CalcNewPoint(t) {
        var x = 0;
        var y = 0;
        var n = this.Points.length - 1;
        
        for (let i = 0; i <= n; i++) {
            var bin = this.C(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
            x += bin * this.Points[i].x;
            y += bin * this.Points[i].y;
        }

        return new p5.Vector(x.toFixed(2), y.toFixed(2));
    }

    C(n, k) {
        var co = 1;
        
        for (let i = n - k + 1; i <= n; i++) {
            co *= i;
        }
        for (let i = 1; i <= k; i++) {
            co /= i;
        }
        
        return co;
    }
    
    IsOnPoint() {
        for (let i = 0; i < this.Points.length; i++) {
            if (
                mouseX > this.Points[i].x - this.Points[i].colliderSize &&
                mouseX < this.Points[i].x + this.Points[i].colliderSize &&
                (mouseY * -1) + height > this.Points[i].y - this.Points[i].colliderSize &&
                (mouseY * -1) + height < this.Points[i].y + this.Points[i].colliderSize
            ) {
                return i;
            }
        }
    }

    Show() {
        strokeWeight(1);

        for (let i = 0; i < this.DrawingPoints.length - 1; i++) {
            line(this.DrawingPoints[i].x, (this.DrawingPoints[i].y * -1) + height, this.DrawingPoints[i + 1].x, (this.DrawingPoints[i + 1].y * -1) + height);
        }

        for (let i = 0; i < this.Points.length; i++) {
            if (i === 0 || i === this.Points.length - 1) {
                stroke(33);
            }
            else {
                stroke(255, 50, 50);
            }
            strokeWeight(10);
            rect(this.Points[i].x, (this.Points[i].y * -1) + height, this.Points[i].size);
            
            textSize(12);
            strokeWeight(1);
            text(i.toString(), this.Points[i].x - 4, (this.Points[i].y * -1) + height + 7);
        }
    }
    
    Update(mouseDrag, mousePress, mouseRel) {
        for (let i = 0; i < this.Points.length; i++) {
            this.Points[i].Update(mouseDrag, mousePress, mouseRel);
        }
    }
}
