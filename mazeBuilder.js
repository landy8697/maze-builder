

document.addEventListener("DOMContentLoaded", function() {
    startGame();
    draw();
    createMaze(10, 10)
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
let dr = [1, 0, -1, 0, 1, 1, -1, -1]
let dc = [0, 1, 0, -1, 1, -1, 1, -1]
function createMaze(r, c){
    var arr = new Array(r);
    for (var i = 0; i < arr.length; i++)arr[i] = Array(c)
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[i].length; j++){
            arr[i][j] = 0;
        }
    }
    var stack = []
    stack.push([0, 0])
    while(stack.length!=0){
        var startdir = parseInt((Math.random()*4)) + 4
        var rotdir = parseInt((Math.random()*2))
        if(rotdir==0)rotdir=-1;
        var cur = stack.pop()
        var r0 = cur[0]
        var c0 = cur[1]
        for(var i = startdir; Math.abs(startdir-i)<4; i+=rotdir){
            r1 = r0 + dr[i%4]
            c1 = c0 + dc[i%4]
            if(!(r1>=0&&c1>=0&&r1<r&&c1<c))continue;
            if(arr[r1][c1]!=0)continue;
            var canPlace = true;
            for(var j = 0; j < 4; j++){
                r2 = r1 + dr[j]
                c2 = c1 + dc[j]
                if(!(r2>=0&&c2>=0&&r2<r&&c2<c))continue;
                if(r2==r0&&c2==c0)continue;
                if(arr[r2][c2]!=0)canPlace = false;
            }
            if(!canPlace)continue;
            arr[r1][c1] = 1;
            stack.push([r1, c1])
        }
    }
    printMaze(arr);
}
function printMaze(maze){
    console.log(maze.length)
    for (var i = 0; i < maze.length; i++) {
        var str = ""
        for (var j = 0; j < maze[i].length; j++)
        {
            str += maze[i][j] + " ";
        }
        console.log(str);
    }
}

function getRandomizedDirections(){

}
function startGame() {
    //alert('hi')
}