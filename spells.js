var playerSize = {"width":game.player.width,"height":game.player.height};
class Spell{
    constructor(game, startX, startY, endX, endY){
        this.game = game;
        this.color = "blue";
        this.baseColor = "blue";
        this.width = 6;
        this.height = 6;
        // acounts for the width and height of the player and the spell
        this.x = startX + playerSize.width / 2;
        this.y = startY + playerSize.height / 2;
        this.speed = 3;
        this.speedX = 0;
        this.speedY = 0;
        this.endX = endX;
        this.endY = endY;
        this.distanceX = this.endX - this.x;
        this.distanceY = this.endY - this.y;
        this.distance = Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY);
        this.speedX = this.distanceX / this.distance * this.speed;
        this.speedY = this.distanceY / this.distance * this.speed;
        this.frame = 0;
        this.getsBigger = false;
        this.explosion = false;
        this.explosionRadius = 0;
        this.explosionParticles = 0;
        this.particleType = "circle";
        this.endFrame = 160;
        this.interpolateSpeed = 3;
        this.interpolateFrame = 20;
        this.interpolated = true;
    }
    draw(){
        // make a circle
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        ctx.fill();
        this.move();
        this.interpolate();
        this.frame++;
    }
    move(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.frame>this.interpolateFrame){
            // if(this.frame % Math.round(10/this.speed) == 0){
                if(this.particleType == "none"){
                    // do nothing
                }else if(this.particleType == "circle"){
                    this.drawParticle('circle');
                }else if(this.particleType == "square"){
                    this.drawParticle('square');
                }
            // }
        }
        // if the spell is off the screen remove it
        if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0){
            if(this.explosion){
                this.explode();
            }
            game.spells.splice(game.spells.indexOf(this), 1);
        }
    }
    drawParticle(type){
        //makes a particle based on the spell color and strength
        let particleColor = this.baseColor;
        //gets bigger as the spell goes on
        if(this.getsBigger){var particleSize = 2.5-(Math.random() * (1 - (this.frame - 60) / 30) + ((1 - (this.frame - 60) / 30)/2));}
        // gets smaller as the spell goes on
        else{var particleSize = (Math.random() * (1 - (this.frame - 60) / 30) + ((1 - (this.frame - 60) / 30)/2));}
        if(particleSize > 0){
            game.staticParticles.push(new Particle(this.x, this.y, particleColor, particleSize*2.5, 0, false, type));
        }
    }
    interpolate(){
        if(this.interpolated){
        // when the frame is equal to 30 double the speed
        if(this.frame == 30){
            // make 20 particles to show the spell is getting faster
            for(let i = 0; i < 10; i++){
                game.activeParticles.push(new Particle(this.x, this.y, this.baseColor, 2, 6, true, 'circle', 10));
            }
            this.speed *= this.interpolateSpeed;
            this.speedX *= this.interpolateSpeed;
            this.speedY *= this.interpolateSpeed;
        }
        // when the frame is equal to 60 set teh speed to 90%
        if(this.frame == 80){
            this.speed *= 0.9;
            this.color = "rgba(0,0,255,0.9)";
        }
        if(this.frame > 120 && this.frame < 140){
            this.speed *= 0.9;
            this.color = "rgba(0,0,255," + (1 - (this.frame - 60) / 30) + ")";
            if(1 - (this.frame - 60) / 30 < 0.5){
                this.color = "rgba(0,0,255,0.5)";
            }
        }
        // at frame 100 remove it from game.spells
        if(this.frame == this.endFrame){
            this.color = "rgba(0,0,0,0)";
            if(this.explosion){
                this.explode();
            }
            // remove the first spell in the array
            game.spells.shift();
        }
        }
    }
    explode(){
        // add a bunch of particles to the game in active particles
        for(let i = 0; i < this.explosionParticles; i++){
            game.activeParticles.push(new Particle(this.x, this.y, this.baseColor, 2, 6, true, 'circle', 300));
        }
    }
}
// sample code for a spell given game.player.x, game.player.y, and the mouse position
// this.spells.push(new Spell(this, game.player.x, game.player.y, game.mouse.x, game.mouse.y));

class Fireball extends Spell{
    constructor(game, startX, startY, endX, endY){
        super(game, startX, startY, endX, endY);
        this.color = "red";
        this.baseColor = "red";
        this.radius = 6;
        this.speed = 3;
        this.speedX = 0;
        this.speedY = 0;
        this.endX = endX;
        this.endY = endY;
        this.distanceX = this.endX - this.x;
        this.distanceY = this.endY - this.y;
        this.distance = Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY);
        this.speedX = this.distanceX / this.distance * this.speed;
        this.speedY = this.distanceY / this.distance * this.speed;
        this.frame = 0;
        this.getsBigger = true;
        this.explosion = true;
        this.explosionRadius = 1;
        this.explosionParticles = 200;
        this.particleType = "square";
        this.interpolateFrame = 50;
        this.endFrame = 60;
        this.interpolateSpeed = 5;
    }
    draw(){
        // make a fireball shape with the tail being randomize
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        for(let i = 0; i < 10; i++){
            ctx.beginPath();
            ctx.arc(this.x + (Math.random() * 10 - 5), this.y + (Math.random() * 10 - 5), this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }
        this.move();
        this.interpolate();
        this.frame++;
    }
}

class Lightning extends Spell{
    constructor(game, startX, startY, endX, endY){
        super(game, startX, startY, endX, endY);
        this.color = "yellow";
        this.baseColor = "yellow";
        this.width = 10;
        this.height = 10;
        this.speed = 3;
        this.speedX = 0;
        this.speedY = 0;
        this.endX = endX;
        this.endY = endY;
        this.distanceX = this.endX - this.x;
        this.distanceY = this.endY - this.y;
        this.distance = Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY);
        this.speedX = this.distanceX / this.distance * this.speed;
        this.speedY = this.distanceY / this.distance * this.speed;
        this.frame = 0;
        this.getsBigger = false;
        this.explosion = false;
        this.explosionRadius = 0;
        this.explosionParticles = 0;
        this.particleType = "none";
        this.endFrame = 80;
        this.interpolated = false;
    }
    draw(){
        // make a random lightning bolt with n number of points
        let breakPoints = 10;
        let points = [];
        for(let i = 0; i < breakPoints; i++){
            points.push({x: this.x + (this.endX - this.x) / breakPoints * i + Math.random() * 10 - 5, y: this.y + (this.endY - this.y) / breakPoints * i + Math.random() * 10 - 5});
        }
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        for(let i = 0; i < points.length; i++){
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        // pick a random point within 40 pixels of the end point and make lightning to that point
        let randomX = this.endX + Math.random() * 32 - 16;
        let randomY = this.endY + Math.random() * 32 - 16;

        let points2 = [];
        for(let i = 0; i < breakPoints*4; i++){
            points2.push({x: this.endX + (randomX - this.endX) / breakPoints * i + Math.random() * 100 - 50, y: this.endY + (randomY - this.endY) / breakPoints * i + Math.random() *  100 - 50});
        }
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.endX, this.endY);
        for(let i = 0; i < points2.length; i++){
            ctx.lineTo(points2[i].x, points2[i].y);
        }
        ctx.stroke();




        this.move();
        this.interpolate();
        this.frame++;
    }
}

// frost spell
class Iceball extends Spell{
    constructor(game, startX, startY, endX, endY){
        super(game, startX, startY, endX, endY);
        this.color = "#A0E3F6";
        this.baseColor = this.color;
        this.radius = 16;
        this.speed = 3;
        this.speedX = 0;
        this.speedY = 0;
        this.endX = endX;
        this.endY = endY;
        this.distanceX = this.endX - this.x;
        this.distanceY = this.endY - this.y;
        this.distance = Math.sqrt(this.distanceX * this.distanceX + this.distanceY * this.distanceY);
        this.speedX = this.distanceX / this.distance * this.speed;
        this.speedY = this.distanceY / this.distance * this.speed;
        this.frame = 0;
        this.getsBigger = true;
        this.explosion = true;
        this.explosionRadius = 5;
        this.explosionParticles = 200;
        this.particleType = "snowflake";
        this.endFrame = 80;
    }
    draw(){
        //make a giant snowball
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        // put some random static snowflakes on the snowball
        for(let i = 0; i < 10; i++){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x + (Math.random() * this.radius - this.radius/2), this.y + (Math.random() * this.radius - this.radius/2), this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }


        this.move();
        this.interpolate();
        this.frame++;
    }
}
