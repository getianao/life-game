function blankGrid(map_length, map_width) {
    
    var arr = new Array();
    for (let i = 0; i < map_width; i++){
        arr[i] = new Array();
        for (let j = 0; j < map_length; j++){
            arr[i][j]=0;
        }
    }
	return arr;
}

function drawGrid(map_length, map_width){

   
	for (let i=0; i < map_width; i++) {
		for (let j=0; j < map_length; j++) {
			var val=grid[i][j];
			if(val==0){
                fill("#888888");
                strokeWeight(1.5);//画笔宽度
                stroke(0);//画笔颜色
                rect(j*grid_width,i*grid_width,grid_width,grid_width,20);
            }
            else{
                fill("#F35956");
                strokeWeight(1.5);//画笔宽度
                stroke(0);//画笔颜色
                rect(j*grid_width,i*grid_width,grid_width,grid_width,20);
            }
		}
	}
}

