let grid, nextGrip;//当代、次代细胞数组

//细胞边长
let grid_width = 30;
//地图大小
var map_len_num = document.getElementById("length").value;
var map_wid_num = document.getElementById("width").value;
//地图像素大小
let map_length = 2000;
let map_width = 2000;
let state = 0;//进行状态，0：暂停，1：开始
let generNum = 0;//迭代次数

  //入口
function setup() {
    var intervalTimer;//定时器重复执行函数
    var cnv=createCanvas(map_length, map_width);
    cnv.position(350, 50);

    grid = blankGrid(map_len_num, map_wid_num);
    updateCanvas(map_len_num, map_wid_num);
    //改变地图大小
    document.getElementById('confirm_map').addEventListener("click", function () {
        map_len_num = document.getElementById("length").value;
        map_wid_num = document.getElementById("width").value;
        grid = blankGrid(map_len_num, map_wid_num);
        state = 0;
        generNum = 0;
        updateCanvas(map_len_num, map_wid_num);
    });

    document.getElementById('start').addEventListener("click", function () {
       
        if (state == 0) {
            state = 1;
            intervalTimer = window.setInterval(nextGeneration, 500);  
        } else {
            
        }
    });
    
    document.getElementById('pause').addEventListener("click", function () {
        console.log(state);
        if (state == 1)
        {
            state = 0;
            window.clearInterval(intervalTimer); 
        } else {
            
        }    
    });

}

function mousePressed() {
    let cell_row = parseInt(mouseY / grid_width);
    let cell_column = parseInt(mouseX / grid_width);

    if (mouseY <= map_width && mouseY >= 0 && mouseX <= map_length && mouseX >= 0) {
        if (grid[cell_row][cell_column] == 0)
            grid[cell_row][cell_column] = 1;
        else
            grid[cell_row][cell_column] = 0;       
        updateCanvas(map_len_num, map_wid_num);
    }
}

function updateCanvas(map_len_num, map_wid_num){
	background(255);
	drawGrid(map_len_num, map_wid_num);
}

//  计数
function nextGeneration() {
    nextGrip=blankGrid(map_len_num, map_wid_num);
            for(let i=0;i<map_wid_num;i++) {
                for(let j=0;j<map_len_num;j++) {
                    let num=0;
                    for(let t=-1;t<=1;t++) {
                        if(i+t>=0&&i+t<map_wid_num) {
                        for(let a=-1;a<=1;a++) {
                            if(j+a>=0&&j+a<map_len_num) {
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
    generNum++;
    document.getElementById('generNum').innerHTML = generNum;
    updateCanvas(map_len_num, map_wid_num);
}

//判断生死
function nextPoint(x, num) {
    //0是死，1是活
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
    