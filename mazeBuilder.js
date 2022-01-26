

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('start-btn').addEventListener('click', () => {
        drawMaze(); 
    });
    startGame();
    
});


let dr = [1, 0, -1, 0, 1, 1, -1, -1]
let dc = [0, 1, 0, -1, 1, -1, 1, -1]
function createMaze(r, c){
    var arr = new Array(r+2);
    for (var i = 0; i < arr.length; i++)arr[i] = Array(c+2)
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[i].length; j++){
            arr[i][j] = 0;
        }
    }
    var stack = []
    stack.push([1, 1])
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
            if(!(r1>=1&&c1>=1&&r1<=r&&c1<=c))continue;
            if(arr[r1][c1]!=0)continue;
            var canPlace = true;
            for(var j = 0; j < 4; j++){
                r2 = r1 + dr[j]
                c2 = c1 + dc[j]
                if(!(r2>=1&&c2>=1&&r2<=r&&c2<=c))continue;
                if(r2==r0&&c2==c0)continue;
                if(arr[r2][c2]!=0)canPlace = false;
            }
            if(!canPlace)continue;
            arr[r1][c1] = 1;
            stack.push([r1, c1])
        }
    }
    var cr = 0
    var cc = 0
    var cdir = 0
    var peri = 0
    while (peri < (r+c)*2+4){
        cr+=dr[cdir];
        cc+=dc[cdir];
        if(cr==0 &&cc==0){
            break;
        }
        if(!(cr>=0&&cc>=0&&cr<=r+1&&cc<=c+1)){
            cr -= dr[cdir];
            cc -= dc[cdir];
            cdir += 1;
            cdir %= 4;
            continue;
        }
        console.log(cr+" "+cc)
        arr[cr][cc] = 0;
        var opp = ((cdir+1)*-1+5)%5-1;

        peri++;
    }
    printMaze(arr);
    return arr;
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

function drawMaze(){
    var canvas = document.getElementById('canvas');
    
    var rows = parseInt(document.getElementById("rows-input").value)
    var cols = parseInt(document.getElementById("cols-input").value)

    var arr = createMaze(rows, cols)
    alert(rows + " " + cols)
    var ctx = canvas.getContext("2d");
    var gridSize = 20;
    canvas.style.width = ((rows+2)*gridSize)+"px";
    canvas.style.height = ((cols+2)*gridSize)+"px";
    ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[i].length; j++){
            if(arr[i][j] == 0)ctx.fillStyle = "black";
            else ctx.fillStyle="white";
            ctx.fillRect(i*gridSize, j*gridSize, gridSize, gridSize);
        }
    }
    
}
function getRandomizedDirections(){

}
function startGame() {
    //alert('hi')
}