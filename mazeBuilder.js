

document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById('start-btn').addEventListener('click', () => {
        drawMaze(); 
    });document.getElementById('solution').addEventListener('click', () => {
        drawSolution(); 
    });document.getElementById('animation').addEventListener('click', () => {
        changeAnimation();
    });
    //startGame();
    
});
var maze;
var sol;
var animate = true;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function changeAnimation(){
    animate = !animate;
    //console.log(animate)
    let btn = document.getElementById('animation')
    if(animate){
        btn.innerHTML = "Animation: On"
        btn.classList.remove("btn-danger")
        btn.classList.add("btn-success")
    }else{
        btn.innerHTML = "Animation: Off"
        btn.classList.remove("btn-success")
        btn.classList.add("btn-danger")
    }
}
function createMaze(r, c){
    //r = r-r%2;
    //c = c-c%2;
    let arr = new Array(r+2);
    let sol = new Array(r+2)
    for(let i = 0; i < arr.length; i++){
        arr[i] = Array(c+2)
        sol[i] = Array(c+2)
        for(let j = 0; j < arr[i].length; j++){
            
            arr[i][j] = 0;
        }
    }
    let dr = [1, 0, -1, 0]
    let dc = [0, 1, 0, -1]
    let ar = [1, 1, -1, -1]
    let ac = [-1, 1, 1, -1]
    
    let stack = []
    stack.push([1, 1])
    arr[1][1] = 1;
    
    while(stack.length!=0){
        let cur = stack.pop()
        let r0 = cur[0]
        let c0 = cur[1]
        //console.log(r0+" "+c0)
        viscnt = 0;
        let vis = [4]
        while(viscnt < 4){
            dir = getRandomInt(4);
            if(vis[dir]==1)continue;
            viscnt++;
            vis[dir] = 1
            r1 = r0 + dr[dir];
            c1 = c0 + dc[dir];
            if(!(r1>=1&&c1>=1&&r1<=r&&c1<=c))continue;
            if(arr[r1][c1]!=0)continue;
            let canPlace = true;
            for(let j = 0; j < 4; j++){
                r2 = r1 + dr[j]
                c2 = c1 + dc[j]
                if(!(r2>=1&&c2>=1&&r2<=r&&c2<=c))continue;
                if(r2==r0&&c2==c0)continue;
                if(arr[r2][c2]!=0)canPlace = false;
            }
            for(let j = 0; j < 2; j++){
                r2 = r1 + ar[(dir+j)%4];
                c2 = c1 + ac[(dir+j)%4];
                if(!(r2>=1&&c2>=1&&r2<=r&&c2<=c))continue;
                if(arr[r2][c2]!=0)canPlace = false;
            }
            
            if(!canPlace)continue;
            arr[r1][c1] = 1;
            sol[r1][c1] = [r1-dr[dir], c1-dc[dir]];
            //arr[r1-dr[dir]][c1-dc[dir]] = 1;
            //sol[r1-dr[dir]][c1-dc[dir]] = [r1-dr[dir]*2, c1-dc[dir]*2];
            stack.push([r1, c1]);
        }  
    }
    printMaze(arr);
    arr[1][0] = 1;
    sol[1][1] = [1, 0];
    let cr = arr.length-1;
    while(cr >= 0){
        if(arr[cr][arr[cr].length-2]==1)break;
        cr--;
    }
    console.log(cr)
    arr[cr][arr[cr].length-1] = 1;
    sol[cr][arr[cr].length-1] = [cr, arr[cr].length-2];
    
    return [arr, sol];
}
function printMaze(maze){
    console.log(maze.length)
    for (let i = 0; i < maze.length; i++) {
        let str = ""
        for (let j = 0; j < maze[i].length; j++)
        {
            str += maze[i][j] + " ";
        }
        console.log(str);
    }
}

function drawMaze(){
    let canvas = document.getElementById('canvas');
    let rows = parseInt(document.getElementById("rows-input").value)
    let cols = parseInt(document.getElementById("cols-input").value)
    let cur = createMaze(rows, cols)
    maze = cur[0];
    sol = cur[1];
    //alert(arr.length + " "+arr[0].length)
    let gridSize = 1000./Math.max(maze.length, maze[0].length);
//    canvas.setAttribute("width", (cols+2)*gridSize);
//    canvas.setAttribute("height", (rows+2)*gridSize);
    let ctx = canvas.getContext("2d");
    ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle="#000000"
    //alert(canvas.style.width+" "+canvas.style.height)
    for(let i = 0; i < maze.length; i++){
        for(let j = 0; j < maze[i].length; j++){
            if(maze[i][j] == 0)ctx.fillStyle = "#000000";
            else ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(j*gridSize, i*gridSize, gridSize, gridSize);
        }
    }
    
}

async function drawSolution(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0000FF";
    let gridSize = 1000./Math.max(maze.length, maze[0].length);
    let stack = []
    let cr = maze.length-1;
    while(cr >= 0){
        if(maze[cr][maze[cr].length-2]==1)break;
        cr--;
    }
    console.log(cr)
    let r = cr;
    let c = maze[cr].length-1;
    console.log(sol[r][c])
    while(true){
        stack.push([r, c])
        if(c==0)break;
        let tr = r;
        let tc = c;
        
        //console.log(r+" "+c)
        r = sol[tr][tc][0];
        c = sol[tr][tc][1];
    }
    
    let delay = 50/(stack.length*stack.length);
    console.log("Delay: "+delay)
    console.log(animate)
    while(!(stack.length==0)){
        let cur = stack.pop();
        let i = cur[0];
        let j = cur[1];
        
        if(animate)await sleep(delay);
        ctx.fillRect(j*gridSize, i*gridSize, gridSize, gridSize);
        
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
