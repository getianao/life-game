let grid, nextGrip; //当代、次代细胞数组
let left_navi;
//细胞边长
let grid_width = 30;
//地图大小
var map_len_num;
var map_wid_num;
let map_len_num_max;
let map_wid_num_max;
//地图像素大小
let map_length;
let map_width;
let left_navi_width; //左端导航栏宽度

let state = 0; //进行状态，0：暂停，1：开始
let generNum = 0; //迭代次数
let runnng_time = 0;
let rate = 500;
let population = 0;

//入口
function setup() {
    var intervalTimer; //定时器重复执行函数
    //布局自适应
    left_navi_width = windowWidth / 5;
    document.getElementById('left_navi').style.width = left_navi_width + "px";
    map_length = windowWidth - left_navi_width - 100;
    map_width = windowHeight - 100;
    var cnv = createCanvas(map_length, map_width);
    cnv.position(left_navi_width + 50, 50);

    //生成初始空地图
    map_len_num_max = parseInt(map_length / grid_width);
    document.getElementById("length").value = map_len_num_max;
    map_wid_num_max = parseInt(map_width / grid_width)
    document.getElementById("width").value = map_wid_num_max;
    map_len_num=map_len_num_max;
    map_wid_num=map_wid_num_max;
    grid = blankGrid(map_len_num, map_wid_num);
    updateCanvas(map_len_num, map_wid_num);


    //改变地图大小
    document.getElementById('confirm_map').addEventListener("click", function () {
        let new_map_len_num = document.getElementById("length").value;
        let new_map_wid_num = document.getElementById("width").value;
        rate = document.getElementById("rate").value;
        //限制地图大小
        if (new_map_len_num > map_len_num_max || new_map_wid_num > map_wid_num_max || new_map_len_num <= 0 || new_map_wid_num <= 0) {
            var alertMess = "For your best experience, keeping the map length between 1~" + map_len_num + " and width between 1~" + map_wid_num + ".";
            alert(alertMess);
        } else {
            map_len_num = new_map_len_num;
            map_wid_num = new_map_wid_num;
            grid = blankGrid(map_len_num, map_wid_num);
            state = 0;
            generNum = 0;
            runnng_time = 0;
            population = 0;
            document.getElementById('timer').innerHTML = runnng_time;
            document.getElementById('population').innerHTML = population;
            document.getElementById('generNum').innerHTML = generNum;
            updateCanvas(map_len_num, map_wid_num);
        }
    });

    document.getElementById('start').addEventListener("click", function () {
        //0表示未开始，1表示已开始
        if (state == 0) {
            document.getElementById('start_word').innerHTML = "pause";
            state = 1;
            timedCount(); //异步？
            intervalTimer = window.setInterval(nextGeneration, rate);
        } else {
            document.getElementById('start_word').innerHTML = "start";
            state = 0;
            window.clearInterval(intervalTimer);
        }
    });
    document.getElementById('random_map').addEventListener("click", function () {
        let cellNum = map_len_num * map_wid_num;
        let alive_cell = parseInt(cellNum / 5);
        let cell_w;
        let cell_l;
        grid = blankGrid(map_len_num, map_wid_num);
        while (alive_cell) {
            cell_w = Math.floor(Math.random() * map_wid_num);
            cell_l = Math.floor(Math.random() * map_len_num);
            if (grid[cell_w][cell_l] == 0) {
                grid[cell_w][cell_l] = 1;
                alive_cell--;
                population++;
            }
        }
        document.getElementById('population').innerHTML = population;
        updateCanvas(map_len_num, map_wid_num);
    });

    document.getElementById('reset_map').addEventListener("click", function () {
        grid = blankGrid(map_len_num, map_wid_num);
        state = 0;
        generNum = 0;
        runnng_time = 0;
        population = 0;
        document.getElementById('timer').innerHTML = runnng_time;
        document.getElementById('population').innerHTML = population;
        document.getElementById('generNum').innerHTML = generNum;
        updateCanvas(map_len_num, map_wid_num);
    });
}

function mousePressed() {
    mouseLocation(mouseX,mouseY,grid_width,grid,map_width,map_length);
    document.getElementById('population').innerHTML = population;
    updateCanvas(map_len_num, map_wid_num);
    }




function updateCanvas(map_len_num, map_wid_num) {
    background(255);
    drawGrid(map_len_num, map_wid_num);
}


function nextGeneration() {
    nextGrip = blankGrid(map_len_num, map_wid_num);
    nextGrip = getNextGen(nextGrip, grid,map_len_num,map_wid_num);
    grid = nextGrip;
    document.getElementById('generNum').innerHTML = ++generNum;
    document.getElementById('population').innerHTML = population;
    updateCanvas(map_len_num, map_wid_num);
}



//计时
function timedCount() {
    if (state == 0)
        return; {
        document.getElementById('timer').innerHTML = runnng_time;
        runnng_time = runnng_time + 1;
        setTimeout("timedCount()", 1000);
    }
}