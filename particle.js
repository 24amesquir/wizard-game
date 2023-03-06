class Particle{
    constructor(x, y, color,radius=3, speed=3, randomSpeed=false, shape="circle", particleLife=30){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.speed = speed;
        if(randomSpeed){
            this.speed = this.speed + (2-Math.random()*2);
        }
        this.angle = Math.random() * Math.PI * 2;
        this.particleCount = 40;
        this.particleLife = particleLife;
        this.fadesteps = 0;
        this.shape = shape;
        this.randomSpeed = randomSpeed;
        this.frame=0;
    }
    draw(){
        if(this.shape == "circle"){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }else if(this.shape == "square"){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.radius, this.radius);
        }else if(this.shape == "triangle"){
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x+this.radius, this.y+this.radius);
            ctx.lineTo(this.x-this.radius, this.y+this.radius);
            ctx.fillStyle = this.color;
            ctx.fill();
        }else if(this.shape == "snowflake"){
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x+this.radius, this.y+this.radius);
            ctx.lineTo(this.x-this.radius, this.y+this.radius);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x+this.radius, this.y-this.radius);
            ctx.lineTo(this.x-this.radius, this.y-this.radius);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        this.frame++;
        // hacky way not sure why particleLife is not working
        console.log(this.color)
        if(this.randomSpeed){
            this.particleLife = 120;
        }
        if(this.color != "#A0E3F6"){
            this.particleLife = 60;
        }
        if(this.frame>this.particleLife){
            this.fade();
        }
        // if the particle is off the screen remove it
        if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0){
            game.staticParticles.splice(game.staticParticles.indexOf(this), 1);
            game.activeParticles.splice(game.staticParticles.indexOf(this), 1);
        }
    }
    update(){
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        if(this.frame>this.particleLife){
            this.fade();
        }
    }
    // broken right now removes all particles not just the one
    fade(){
        //make radius fade faster at the end
        if(this.radius > .05*this.fadesteps && this.fadesteps < 10){
            this.radius -= .05;
            this.fadesteps += 1;
        }else if(this.radius > .05*this.fadesteps && this.fadesteps >= 10){
            this.radius -= .1;
            this.fadesteps += 1;
        }else{
            game.staticParticles.splice(game.staticParticles.indexOf(this), 1);
            game.activeParticles.splice(game.staticParticles.indexOf(this), 1);
        }
        if(this.radius < 0){
            game.staticParticles.splice(game.staticParticles.indexOf(this), 1);
            game.activeParticles.splice(game.staticParticles.indexOf(this), 1);
        }
    }
}