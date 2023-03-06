class Player{
    constructor(game){
        this.game = game;
        this.x = width/2;
        this.y = height/2;
        this.speedX = 0;
        this.speedY = 0;
        // causes instability if it is lower than .1
        this.maxSpeed = .01;
        this.maxSpeedMovement = 1;
        this.frame = 0;
        this.moving = false;
        this.movingInterval = null;
        this.moveDistance = 10;
        this.spellSpeed = 2;
        this.url = null;
        this.color = 'red';
        this.url = 'Q:/code/games/arpg/assets/images/sprites/wizard monkey.png';
        this.width = 20;
        this.height = 20;
        this.rotation = 0;
        this.scale = .5;
        this.moving = false;
        this.spellType = 0;
        this.numSpells = 2;
    }
    draw(){
        if(this.url != null){
            let img = new Image();
            img.src = this.url;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.translate(-this.x, -this.y);
            ctx.drawImage(img, this.x, this.y, img.width*this.scale, img.height*this.scale);
            this.width = img.width*this.scale;
            this.height = img.height*this.scale;
            ctx.restore();
        }else{
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        this.frame++;
    }
    keys(){
        // if the user presses wasd call game.player.moveTo(x,y) with the x and y being the player's current position plus or minus a distance
        if(this.moving){
            return false;
        }
        if(keys[87]){
            this.ySpeed = -this.maxSpeedMovement;
        }
        if(keys[83]){
            this.ySpeed = this.maxSpeedMovement;
        }
        if(keys[65]){
            this.xSpeed = -this.maxSpeedMovement;
        }
        if(keys[68]){
            this.xSpeed = this.maxSpeedMovement;
        }
        if(keys[87] && keys[83]){
            this.ySpeed = 0;
        }
        if(keys[65] && keys[68]){
            this.xSpeed = 0;
        }
        if(keys[87] && keys[65]){
            this.ySpeed = -this.maxSpeedMovement;
            this.xSpeed = -this.maxSpeedMovement;
        }
        if(keys[87] && keys[68]){
            this.ySpeed = -this.maxSpeedMovement;
            this.xSpeed = this.maxSpeedMovement;
        }
        if(keys[83] && keys[65]){
            this.ySpeed = this.maxSpeedMovement;
            this.xSpeed = -this.maxSpeedMovement;
        }
        if(keys[83] && keys[68]){
            this.ySpeed = this.maxSpeedMovement;
            this.xSpeed = this.maxSpeedMovement;
        }
        if(!keys[87] && !keys[83]){
            this.ySpeed = 0;
        }
        if(!keys[65] && !keys[68]){
            this.xSpeed = 0;
        }
        this.speedX = this.xSpeed;
        this.speedY = this.ySpeed;

        // Q and E rotate the player around the center of the player
        if(keys[81]){
            this.rotation -= .05;
        }
        if(keys[69]){
            this.rotation += .05;
        }

        // 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -, and = change the spell type
        switch(true){
            case keys[49]:
                this.spellType = 0;
                break;
            case keys[50]:
                this.spellType = 1;
                break;
            case keys[51]:
                this.spellType = 2;
                break;
            case keys[52]:
                this.spellType = 3;
                break;
            case keys[53]:
                this.spellType = 4;
                break;
            case keys[54]:
                this.spellType = 5;
                break;
            case keys[55]:
                this.spellType = 6;
                break;
            case keys[56]:
                this.spellType = 7;
                break;
            case keys[57]:
                this.spellType = 8;
                break;
            case keys[48]:
                this.spellType = 9;
                break;
            case keys[189]:
                this.spellType = 10;
                break;
            case keys[187]:
                this.spellType = 11;
                break;
        }
    }
    move(){
        // acount for the cube width and height
        if(this.x + this.width + this.speedX < this.game.width && this.x + this.speedX > 0){
            this.x += this.speedX;
            this.x = Math.round(this.x * 100) / 100;
        }
        if(this.y + this.height + this.speedY < this.game.height && this.y + this.speedY > 0){
            this.y += this.speedY;
            this.y = Math.round(this.y * 100) / 100;
        }
        this.keys();
    }
    moveTo(x,y){
        if(this.moving == false){
            this.moving = true;
            this.movingInterval = setInterval(() => {
            for(let i = 0; i < 200; i++){
                // checks if the player is close enough to the target to stop moving within 6 pixels
                if(Math.abs(this.x-x) > 6 || Math.abs(this.y-y) > 6){
                    if(this.x < x){
                        this.speedX = this.maxSpeed;
                    }else{
                        this.speedX = -this.maxSpeed;
                    }
                    if(this.y < y){
                        this.speedY = this.maxSpeed;
                    }else{
                        this.speedY = -this.maxSpeed;
                    }
                    this.move();
                    this.draw();
                }else{
                    // stops the player from moving
                    clearInterval(this.movingInterval);
                    this.moving = false;
                    this.speedX = 0;
                    this.speedY = 0;
                    return
                }
            }
        }, 1000 / 60);
        } else{
            if(this.movingInterval){
                clearInterval(this.movingInterval);
                this.moving = false;
                this.speedX = 0;
                this.speedY = 0;
            }
            moveTo(x,y);
        }
    }
    crashWith(obstacle){
        return !(this.x > obstacle.x + obstacle.width ||
            this.x + this.width < obstacle.x ||
            this.y > obstacle.y + obstacle.height ||
            this.y + this.height < obstacle.y);
    }
    castSpell(){
        if(this.spellType == 0){
            this.game.spells.push(new Spell(this, game.player.x+10, game.player.y + this.height/2, game.mouse.x, game.mouse.y));
        }
        if(this.spellType == 1){
            this.game.spells.push(new Fireball(this, game.player.x+10, game.player.y + this.height/2, game.mouse.x, game.mouse.y));
        }
        if(this.spellType == 2){
            this.game.spells.push(new Iceball(this, game.player.x+10, game.player.y + this.height/2, game.mouse.x, game.mouse.y));
        }
        if(this.spellType == 3){
            this.game.spells.push(new Lightning(this, game.player.x+10, game.player.y + this.height/2, game.mouse.x, game.mouse.y));
        }
    }
}
