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
    initNewGrid(){// So first we do the drunk walk , then we set the edges again, then we make the entry and end accesible again
        var endTile = this.carveSingleCycle(10, 4);
        this.setEdges();
        if(endTile != undefined){
            this.setTileByTuple([endTile.yAxis, endTile.xAxis], "X", true);
        }
        this.setTileByTuple(this.startingPosition, "S", true);
    }
    setEdges(){
        for(let y of this.tiles){
            for(let x of y){
                if(this.playerPosition[0] == 0 || this.playerPosition[0] == this.yAxisLength -1 || this.playerPosition[1] == 0 || this.playerPosition[1] == this.xAxisLength -1 ){
                x.traversable = false;
                x.value = "0";
                }
            }
        }
    }
    carveSingleCycle(maximumComplexity: number, lowestMatch: number): Tile | void{
        var finalEnd: Tile = new Tile;
        var succes = false;
        for(var i = 1; i<= maximumComplexity; i++){
            var result = this.carveSinglePath();
            if(result.yAxis == this.yAxisLength -1){//Arbitrary ends of level at right side for now
                finalEnd = result;
                succes = true;
            }
            if(succes == true && i >= lowestMatch){
                break;
            }
        }
        if(succes == true){
            this.finishPosition = [finalEnd.yAxis, finalEnd.xAxis];
            return finalEnd;
        }else{
            this.carveSingleCycle(maximumComplexity, lowestMatch);// Loop again if arbitrary criteria isnt met
        }
    } 
    carveSinglePath(): Tile{ // So the basic idea is that the unit will randomly walk paths untill its at an edge, this will eventually be considered the traversable paths in the generated cave
        var finished = false;
        var tileToReturn;
        while(!finished){
            var randomNumber = Math.floor(Math.random() * 3)
            this.carveSingleMove(randomNumber);
            if(this.playerPosition[0] == 0 || this.playerPosition[0] == this.yAxisLength -1 || this.playerPosition[1] == 0 || this.playerPosition[1] == this.xAxisLength -1 ){
                finished = true;
                tileToReturn = new Tile;
                tileToReturn.xAxis = this.playerPosition[1];
                tileToReturn.yAxis = this.playerPosition[0];
            }
        }
        return tileToReturn;
    }
    carveSingleMove(number: number):number{
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