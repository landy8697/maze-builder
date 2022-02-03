

document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById('start-btn').addEventListener('click', () => {
        drawMaze(); 
    });
    startGame();
    
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createMaze(r, c){
    r = r-r%2;
    c = c-c%2;
    let arr = new Array(r+2);
    for (let i = 0; i < arr.length; i++)arr[i] = Array(c+2)
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            arr[i][j] = 0;
        }
    }
    let dr = [1, 0, -1, 0]
    let dc = [0, 1, 0, -1]
    
    let stack = []
    stack.push([1, 1])
    while(stack.length!=0){
        let cur = stack.pop()
        let r0 = cur[0]
        let c0 = cur[1]
        console.log(r0+" "+c0)
        viscnt = 0;
        let vis = [4]
        while(viscnt < 4){
            dir = getRandomInt(3);
            if(vis[dir]==1)continue;
            viscnt++;
            vis[dir] = 1
            r1 = r0 + 2*(dr[dir]);
            c1 = c0 + 2*(dc[dir]);
            if(!(r1>=1&&c1>=1&&r1<=r&&c1<=c))continue;
            if(arr[r1][c1]!=0)continue;
            let canPlace = true;
            for(let j = 0; j < 4; j++){
                r2 = r1 + dr[j]*2
                c2 = c1 + dc[j]*2
                if(!(r2>=1&&c2>=1&&r2<=r&&c2<=c))continue;
                if(r2==r0&&c2==c0)continue;
                if(arr[r2][c2]!=0)canPlace = false;
            }
            if(!canPlace)continue;
            arr[r1][c1] = 1;
            arr[r1-dr[dir]][c1-dc[dir]] = 1;
            stack.push(r1, c1);
        }
        
    }
    printMaze(arr);
    return arr;
    /*
    let dir =  Array(24);
    getRandomizedDirections(0, new Array(4), dir, 0);
    let dr = [1, 0, -1, 0, 1, 1, -1, -1]
    let dc = [0, 1, 0, -1, 1, -1, 1, -1]
    r = r-r%2;
    c = c-c%2;
    let arr = new Array(r+2);
    for (let i = 0; i < arr.length; i++)arr[i] = Array(c+2)
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            arr[i][j] = 0;
        }
    }
    let stack = []
    stack.push([1, 1])
    while(stack.length!=0){
        let dirarr = dir[parseInt(Math.random()*24)];
       // let startdir = parseInt((Math.random()*4)) + 4
      //  let rotdir = parseInt((Math.random()*2))
      //  if(rotdir==0)rotdir=-1;
        let cur = stack.pop()
        let r0 = cur[0]
        let c0 = cur[1]
        for(let i = 0; i<4; i++){
            r1 = r0 + dirarr[i]/10;
            c1 = c0 + dirarr[i]%10;
            if(!(r1>=1&&c1>=1&&r1<=r&&c1<=c))continue;
            if(arr[r1][c1]!=0)continue;
            let canPlace = true;
            for(let j = 0; j < 4; j++){
                r2 = r1 + dr[j]*2
                c2 = c1 + dc[j]*2
                if(!(r2>=1&&c2>=1&&r2<=r&&c2<=c))continue;
                if(r2==r0&&c2==c0)continue;
                if(arr[r2][c2]!=0)canPlace = false;
            }
            if(!canPlace)continue;
            arr[r1-dr[i%4]][c1-dc[i%4]]=1;
            arr[r1][c1] = 1;
            stack.push([r1, c1])
        }
    }
    let cr = 0
    let cc = 0
    let cdir = 0
    let peri = 0
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
        let opp = ((cdir+1)*-1+5)%5-1;

        peri++;
    }
    printMaze(arr);
    return arr;
    */
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

    let arr = createMaze(rows, cols)
    alert(rows + " " + cols)
    
    let gridSize = 10;
    canvas.setAttribute("width", (cols+2)*gridSize);
    canvas.setAttribute("height", (rows+2)*gridSize);
    let ctx = canvas.getContext("2d");
    ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle="#000000"
    alert(canvas.style.width+" "+canvas.style.height)
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            if(arr[i][j] == 0)ctx.fillStyle = "#000000";
            else ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(i*gridSize, j*gridSize, gridSize, gridSize);
        }
    }
    
}

var idx = 0;
function getRandomizedDirections(d, cur, dir){
    let dr = [1, 0, -1, 0, 1, 1, -1, -1]
    let dc = [0, 1, 0, -1, 1, -1, 1, -1]
    if(d==4){
        let arr = Array(4);
        for(let i = 0; i < 4; i++){
            arr[i] = cur[i];
        }
        console.log(arr);
        dir[idx] = arr;
        idx++;
        return;
    }
    for(let i = 0; i < 4; i++){
        cur[d] = dr[i]*10+dc[i];
        getRandomizedDirections(d+1, cur, dir)
    }
}
function startGame() {
    //alert('hi')
}