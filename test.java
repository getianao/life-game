public void nextGeneration() {
		int [][]nextMap=new int [row][col];
		
		for(int i=0;i<row;i++) {
			for(int j=0;j<col;j++) {
				int num=0;
				for(int t=-1;t<=1;t++) {
					if(i+t>=0&&i+t<row) {
					for(int a=-1;a<=1;a++) {
						if(j+a>=0&&j+a<col) {
							if(map[i+t][j+a]==1) {
								num+=map[i+t][j+a];
							}
						}
						}
					}
				}
				num-=map[i][j]; //减去中心点
			
				//System.out.println(num);
				
				int res=nextPoint(map[i][j],num);
				nextMap[i][j]=res;
				
			}
		}
		this.map=nextMap;
	}
}
