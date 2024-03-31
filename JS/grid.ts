class Grid{
    tiles: [Tile[]];
    xAxisLength: number;
    yAxisLength: number;
    startingPosition: [number, number];
    finishPosition: [number, number];
    playerPosition: [number, number];
    fillGrid(){
        for(let y of this.tiles){
            for(let x of y){
                x.traversable = false;
                x.value = "0";
            }
        }
    }
    setStartingPosition(){
        this.startingPosition = [Math.floor(Math.random() * this.yAxisLength -1) + 1, 0] //Don't want the level to start on a corner
        this.setTileByTuple(this.startingPosition, "S", true);
        this.playerPosition = this.startingPosition;
    }
    setTileByTuple(tuple: [number, number], value: string, traversable: boolean){
        this.tiles[tuple[0]][tuple[1]].value = value;
        this.tiles[tuple[0]][tuple[1]].traversable = traversable;
    } 
    carvePath(){ // So the basic idea is that the unit will randomly walk paths untill its at an edge, this will eventually be considered the traversable paths in the generated cave
        var finished = false;
        while(!finished){
            var randomNumber = Math.floor(Math.random() * 3)
            this.carveSingle(randomNumber);
            if(this.playerPosition[0] == 0 || this.playerPosition[0] == this.yAxisLength -1 || this.playerPosition[1] == 0 || this.playerPosition[1] == this.xAxisLength -1 ){
                finished = true;
            }
        }
    }
    carveSingle(number: number):number{
        switch(number){
            case 0:
                this.setTileByTuple([this.playerPosition[0]+1, this.playerPosition[1]], "-", true);
                this.playerPosition = [this.playerPosition[0]+1, this.playerPosition[1]];
                return 0;
            case 1:
                this.setTileByTuple([this.playerPosition[0]-1, this.playerPosition[1]], "-", true);
                this.playerPosition = [this.playerPosition[0]-1, this.playerPosition[1]];
                return 1; 
            case 2:
                this.setTileByTuple([this.playerPosition[0], this.playerPosition[1]+1], "-", true);
                this.playerPosition = [this.playerPosition[0], this.playerPosition[1]+1];
                return 2;
            default:
                this.setTileByTuple([this.playerPosition[0]+1, this.playerPosition[1]-1], "-", true)
                this.playerPosition = [this.playerPosition[0]+1, this.playerPosition[1]-1];
                return 3;
        }
    }  
}