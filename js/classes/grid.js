import {Cell} from './cell.js';

function matrix( rows, cols, defaultValue){
    const arr = [];
    for(let i=0; i < rows; i++){
        arr.push([]);
        arr[i].push( new Array(cols));
        for(let j=0; j < cols; j++){
            arr[i][j] = defaultValue;
        }
    }
    return arr;
}

export class Grid {
    constructor(cols, rows) {
        this.cells = matrix(rows, cols, {});
        console.log(this.cells)
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                this.cells[i][j] = new Cell();
            }
        }
    }

    getCellForPosition(col, row){
        if(col < 0 || row < 0 || row >= this.cells.length  || col >= this.cells.length){
            return new Cell();
        }
        return this.cells[col][row]

    }
    countNeighborsForCellPosition(column, row){
        let aliveNeighbors = 0;
        if(this.getCellForPosition(column-1,row-1).currentState.isAlive) aliveNeighbors++; // upper left hand corner
        if(this.getCellForPosition(column-1,row).currentState.isAlive) aliveNeighbors++; // above
        if(this.getCellForPosition(column-1,row+1).currentState.isAlive) aliveNeighbors++; // upper right hand corner

        if(this.getCellForPosition(column,row+1).currentState.isAlive) aliveNeighbors++; // right
        if(this.getCellForPosition(column,row-1).currentState.isAlive) aliveNeighbors++; // left

        if(this.getCellForPosition(column+1,row-1).currentState.isAlive) aliveNeighbors++; // lower left hand corner
        if(this.getCellForPosition(column+1,row).currentState.isAlive) aliveNeighbors++; // below
        if(this.getCellForPosition(column+1,row+1).currentState.isAlive) aliveNeighbors++; // lower right hand corner
        return aliveNeighbors;
    }
}