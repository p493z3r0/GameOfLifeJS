import {Grid} from './classes/grid.js';

window.onload = () => init();
let GRID_WIDTH = 0;
let GRID_HEIGHT = 0;
let currentInterval;
let game;
function init(){
    document.getElementById('createButton').onclick = () => {
        GRID_HEIGHT = document.getElementById('gridWidth').value;
        GRID_WIDTH = document.getElementById('gridHeight').value;

        const rootElement = document.getElementById('game');
        game = new Game(new Grid(GRID_WIDTH, GRID_HEIGHT), rootElement);
        game.initializeFrame();
    }

    document.getElementById('simulateOne').onclick = () => {
        game.render(true);
    }

    document.getElementById('play').onclick = () => {
        const button = document.getElementById('play')
        if(button.innerText === 'Stop'){
            window.clearInterval(currentInterval);
            button.innerText = 'Start';
            return;
        }
        button.innerText = "Stop";

        currentInterval = setInterval(()=> {
            game.render(true);
        }, 1000)

    }
}

class Game {
    constructor(grid, rootElement) {
        this.grid = grid;
        if(!rootElement instanceof HTMLElement){
            throw new Error('Root Element must be an HTML Element!')
        }
        this.rootElement = rootElement;
    }
    //should only be called once to setup the frame
    initializeFrame(){
        if(this.rootElement.hasChildNodes()){
            alert('It says only one time ya donut -.-')
            throw new Error('Non empty starting point specified')
        }
        this.rootElement.style.display = 'grid';
        this.rootElement.style.width = String(GRID_WIDTH*20 + 'px');
        this.rootElement.style.height = String(GRID_HEIGHT*20 + 'px');

        this.rootElement.style.gridTemplateColumns = `repeat(${GRID_WIDTH}, 20px`
        this.rootElement.style.gridTemplateRows = `repeat(${GRID_HEIGHT}, 20px`

        this.render()
    }
    render(applyRules = false, switchState=false){
        this.rootElement.innerHTML = '';
        for(let i = 0; i < GRID_HEIGHT; i++){
            for(let j = 0; j < GRID_WIDTH; j++){
                const cell = this.grid.cells[i][j];
                if(applyRules){
                    cell.applyRules(game, i, j);
                }
                if(switchState){
                    cell.populateState();
                }
                this.rootElement.appendChild(cell.render(game));
            }
        }
        if(applyRules){
            this.render(false, true);
        }

    }
}