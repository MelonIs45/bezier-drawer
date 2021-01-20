class Handle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.colliderSize = 15;
        this.xOffset = 0;
        this.yOffset = 0;
        this.locked = false;
        this.overBox = false;
    }
    
    Update(mouseDrag, mousePress, mouseRel) {
        if (
            mouseX > this.x - this.colliderSize &&
            mouseX < this.x + this.colliderSize &&
            mouseY > (this.y * -1 + height) - this.colliderSize &&
            mouseY < (this.y * -1 + height) + this.colliderSize
        ) {
            this.overBox = true;
            if (!this.locked) {
                stroke(100, 20, 20);
            }
        } else {
            this.overBox = false;
        }
        
        if (mouseDrag) {
            if (this.locked) {
                this.x = mouseX - this.xOffset;
                this.y = (mouseY - this.yOffset) * -1 + height;
            }
        }
        else if (mousePress) {
            this.locked = this.overBox;
            this.xOffset = mouseX - this.x;
            this.yOffset = mouseY * -1 - this.y + height;
        }
        else if (mouseRel) {
            this.locked = false;
        }
    }
}

