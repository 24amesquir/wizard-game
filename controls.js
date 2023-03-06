// when the user clicks call the moveTo function on the player object
document.getElementById("canvas").addEventListener("click", function(event){
    // acount for the offset of the canvas
    let x = event.clientX - canvas.offsetLeft;
    let y = event.clientY - canvas.offsetTop;
    game.player.moveTo(x,y);
});

let keys = [];

document.addEventListener("keydown", function(event){
    keys[event.keyCode] = true;
});

document.addEventListener("keyup", function(event){
    keys[event.keyCode] = false;
});

// on right click call function cast spell
document.getElementById("canvas").addEventListener("contextmenu", function(event){
    event.preventDefault();
    game.player.castSpell();
});

// keep track of the mouse position at game.mouse.x and game.mouse.y
document.getElementById("canvas").addEventListener("mousemove", function(event){
    game.mouse.x = event.clientX - canvas.offsetLeft;
    game.mouse.y = event.clientY - canvas.offsetTop;
});

// wheter the mouse is held or not
document.getElementById("canvas").addEventListener("mousedown", function(event){
    game.mouse.held = true;
});

document.getElementById("canvas").addEventListener("mouseup", function(event){
    game.mouse.held = false;
});


//if the player switches tabs reset the keys array
document.addEventListener("visibilitychange", function(){
    resetControls();
});

function resetControls(){
    keys = [];
    game.mouse.held = false;
    game.mouse.x = 0;
    game.mouse.y = 0;
}