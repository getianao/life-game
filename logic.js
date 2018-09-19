//判断生死
function nextPoint(x, num) {
    //0是死，1是活
    if (x == 0) {
        if (num == 3) {
            population++;
            return 1;
        }
    }
    if (x == 1) {
        if (num > 3) {
            population--;
            return 0;
        }
        if (num < 2) {
            population--;
            return 0;
        }
        return 1;
    }
    return 0;
}

function getNextGen(mNextGrip, mGrid, m_map_wid_num, m_map_len_num) {
    for (let i = 0; i < m_map_len_num; i++) {
        for (let j = 0; j < m_map_wid_num; j++) {
            let num = 0;
            for (let t = -1; t <= 1; t++) {
                if (i + t >= 0 && i + t < m_map_len_num) {
                    for (let a = -1; a <= 1; a++) {
                        if (j + a >= 0 && j + a < m_map_wid_num) {
                            if (mGrid[i + t][j + a] == 1) {
                                num += mGrid[i + t][j + a];
                            }
                        }
                    }
                }
            }
            num -= mGrid[i][j]; //减去中心点
            let res = nextPoint(mGrid[i][j], num);
            mNextGrip[i][j] = res;
        }
    }
    return mNextGrip;
}

function mouseLocation(mMouseX, mMouseY, m_grid_width, m_grid, m_map_width, m_map_length) {
    let cell_row = parseInt(mMouseY / m_grid_width);
    let cell_column = parseInt(mMouseX / m_grid_width);
    if (mMouseY <= m_map_width && mMouseY >= 0 && mMouseX <= m_map_length && mMouseX >= 0) {
        if (m_grid[cell_row][cell_column] == 0) {
            m_grid[cell_row][cell_column] = 1;
            population++;
        } else {
            m_grid[cell_row][cell_column] = 0;
            population--;
        }
        return m_grid;
    }
    else 
        return;
}