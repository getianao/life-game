let grid, nextGrip;//当代、次代细胞数组
let left_navi;
//细胞边长
let grid_width = 30;
//地图大小
var map_len_num ;
var map_wid_num ;
//地图像素大小
let map_length ;
let map_width ;
let left_navi_width;//左端导航栏宽度

let state = 0;//进行状态，0：暂停，1：开始
let generNum = 0;//迭代次数
let runnng_time=0;
let rate=500;

  //入口
function setup() {
    var intervalTimer;//定时器重复执行函数
    //布局自适应
    left_navi_width=windowWidth/5;
    document.getElementById('left_navi').style.width=left_navi_width+"px";
    map_length = windowWidth-left_navi_width-100;
    map_width = windowHeight-100;
    var cnv=createCanvas(map_length, map_width);
    cnv.position(left_navi_width+50 ,50);

    //生成初始空地图
    map_len_num=parseInt(map_length/grid_width);
    document.getElementById("length").value=map_len_num;
    map_wid_num=parseInt(map_width/grid_width)
    document.getElementById("width").value=map_wid_num;
   
    grid = blankGrid(map_len_num, map_wid_num);
    updateCanvas(map_len_num, map_wid_num);
    

    //改变地图大小
    document.getElementById('confirm_map').addEventListener("click", function () {
        let new_map_len_num = document.getElementById("length").value;
        let new_map_wid_num = document.getElementById("width").value;
        rate=document.getElementById("rate").value;
        //限制地图大小
        if(new_map_len_num>map_len_num||new_map_wid_num>map_wid_num||new_map_len_num<=0||new_map_wid_num<=0)
        {
            var alertMess="For your best experience, keeping the map length between 1~"+map_len_num+" and width between 1~"+map_wid_num+".";
            alert(alertMess);
        }
        else{ 
            map_len_num=new_map_len_num;
            map_wid_num=new_map_wid_num;
            grid = blankGrid(map_len_num, map_wid_num);
            state = 0;
            generNum = 0;
            runnng_time=0;
            generNum=0;
            updateCanvas(map_len_num, map_wid_num);
        }
    });

    document.getElementById('start').addEventListener("click", function () {
       //0表示未开始，1表示已开始
       
        if (state == 0) {
            
            document.getElementById('start_word').innerHTML="pause";
            state = 1;
            timedCount();//异步？
            intervalTimer = window.setInterval(nextGeneration, rate);  
        } else {
            document.getElementById('start_word').innerHTML="start";
            state = 0;
            window.clearInterval(intervalTimer); 
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
    
//计时
function timedCount()
 {
     if(state==0)
        return;
     {
        document.getElementById('timer').innerHTML=runnng_time;
        runnng_time=runnng_time+1;
        setTimeout("timedCount()",1000);
     }
 }
