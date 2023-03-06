class Obstacle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    show(){
        fill(255,0,0);
        rect(this.x,this.y,this.width,this.height);
    }

    update(){
        this.x -= 5;
    }
}