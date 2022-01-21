

document.addEventListener("DOMContentLoaded", function() {
    startGame();
    draw();
});

function draw() {
    var canvas = document.getElementById("myCanvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    
        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(50, 50, 50, 50);
      }
}


function startGame() {
    //alert('hi')
}