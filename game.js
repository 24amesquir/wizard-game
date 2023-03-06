let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.obstacles = [];
        this.score = 0;
        this.spells = [];
        this.gameOver = false;
        this.staticParticles = [];
        this.activeParticles = [];
        this.mouse = {
            x: 0,
            y: 0,
            held: false
        };
        this.interval = null;
    }
    start(){
        this.interval = setInterval(() => {
            this.update();
        }, 1000 / 60);
    }
    clear(){
        ctx.clearRect(0, 0, this.width, this.height);
    }
    draw(){
        this.player.draw();
        this.spells.forEach(spell => spell.draw());
        this.staticParticles.forEach(staticParticles => staticParticles.draw());
        this.activeParticles.forEach(activeParticles => activeParticles.draw());
        this.activeParticles.forEach(activeParticles => activeParticles.update());
        this.obstacles.forEach(obstacle => obstacle.draw());
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(this.score, 50, 50);
        // in the top right corner put how many objects are being drawn
        var objects = this.obstacles.length + this.spells.length + this.staticParticles.length + this.activeParticles.length;
        ctx.fillText(objects, this.width - 100, 50);
        // in the top center do the current spell type in the color of the spell
        ctx.fillStyle = this.player.spellColor;
        ctx.fillText(this.player.spellType, this.width/2, 50);
    }
    move(){
        this.player.move();
        this.obstacles.forEach(obstacle => obstacle.move());
    }
    checkCollision(){
        this.obstacles.forEach(obstacle => {
            if(this.player.crashWith(obstacle)){
                this.gameOver = true;
            }
        });
    }
    checkGameOver(){
        if(this.gameOver){
            clearInterval(this.interval);
            ctx.font = "60px Arial";
            ctx.fillText("Game Over", 50, 200);
        }
    }
    update(){
        this.clear();
        this.move();
        this.draw();
        this.checkCollision();
        this.checkGameOver();
        this.score++;
    }
}
