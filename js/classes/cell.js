export class CellState{
    constructor(isAlive) {
        this.isAlive = isAlive;
    }
}
export class Cell {
    constructor() {
        this.currentState = new CellState(false);
        this.nextState = new CellState(false);
    }
    setNextState(isAlive){
        this.nextState.isAlive = isAlive;
    }

    populateState(){
        this.currentState = JSON.parse(JSON.stringify(this.nextState));
    }
    render(game){
        const element = document.createElement('div');
        element.style.width = '20px';
        element.style.height = '20px';
        element.style.backgroundColor = this.currentState.isAlive ? 'black' : 'white';
        element.style.border = '1px solid black';
        element.onclick = () => {
            this.currentState.isAlive = !this.currentState.isAlive;
            game.render()
        }
        return element;
    }

    applyRules(game, row, col){
        /*
            Any live cell with two or three live neighbours survives.
            Any dead cell with three live neighbours becomes a live cell.
            All other live cells die in the next generation. Similarly, all other dead cells stay dead.
         */
        let grid = game.grid;
        const neighborCount = grid.countNeighborsForCellPosition(row, col);
        if(this.currentState.isAlive && neighborCount === 2 || this.currentState.isAlive && neighborCount === 3){
            this.setNextState(true);
            return;
        }
        if(this.currentState.isAlive && neighborCount < 2){
            this.setNextState(false);
            return;
        }
        if(this.currentState.isAlive && neighborCount > 3){
            this.setNextState(false);
            return;
        }
        if(this.currentState.isAlive === false && neighborCount === 3){
            this.setNextState(true);
        }
    }
}

