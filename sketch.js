let grid,nextGrip;
var map_length = document.getElementById("length").value;
var map_width = document.getElementById("width").value;
var int;
console.log(map_length);
console.log(map_width);

function mousePressed() {

    let cell_row = parseInt(mouseY / 50);
    let cell_column = parseInt(mouseX / 50);
 
    if (mouseY <= 4000 && mouseY >= 0 && mouseX <= 4000 && mouseX >= 0) {
        if (grid[cell_row][cell_column] == 0)
            grid[cell_row][cell_column] = 1;
        else
            grid[cell_row][cell_column] = 0;
        
        updateCanvas(map_length, map_width);
    }
}

  
function setup() {
    
    createCanvas(4000, 4000);
    grid = blankGrid(map_length, map_width);

    console.log(grid);
    updateCanvas(map_length, map_width);
    document.getElementById('confirm_map').addEventListener("click", function () {
        map_length = document.getElementById("length").value;
        map_width = document.getElementById("width").value;
        grid = blankGrid(map_length, map_width);
        updateCanvas(map_length, map_width);
    });
    
    document.getElementById('start').addEventListener("click", function () {

        int = window.setInterval(nextGeneration,500); 
       
    });
    // document.getElementById('pause').addEventListener("pause", function () {
    //     console.log("111");
    //     window.clearTimeout(t1);
       
    // });
}


function updateCanvas(map_length, map_width){
	background(255);
	drawGrid(map_length, map_width);
}
//0是死，1是活
function nextPoint(x, num) {
    if (x == 0) {
        if (num == 3) {
            return 1;
        }
    }
    if (x == 1) {
        if (num > 3) {
            return 0;
        }
        if (num < 2) {
            return 0;
        }
        return 1;
    }
    return 0;
}
    

function nextGeneration() {
    nextGrip=blankGrid(map_length, map_width);
            for(let i=0;i<map_width;i++) {
                for(let j=0;j<map_length;j++) {
                    let num=0;
                    for(let t=-1;t<=1;t++) {
                        if(i+t>=0&&i+t<map_width) {
                        for(let a=-1;a<=1;a++) {
                            if(j+a>=0&&j+a<map_length) {
                                if(grid[i+t][j+a]==1) {
                                    num+=grid[i+t][j+a];
                                }
                            }
                            }
                        }
                    }
                    num-=grid[i][j]; //减去中心点
                    let res=nextPoint(grid[i][j],num);
                    nextGrip[i][j]=res;
                }
            }
    grid = nextGrip;
    updateCanvas(map_length, map_width);
}
