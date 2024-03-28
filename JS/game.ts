class Game{
    private isRunning: boolean = false;
    private isPaused: boolean = false;
    private player: Player;
    private gamemap: GameMap;
    public start(){
        this.isRunning = true;
        this.render();
    }
    private initiateState(){
        this.player = new Player;
        this.gamemap = new GameMap;
    }
    public restart(){
        this.initiateState();
    }
    private render(){
        this.initiateState();
        while(this.isRunning = true){
            console.log("-");
        }
    }
    isGameRunning(){
        return this.isRunning;
    }
    isGamePaused(){
        return this.isPaused;
    }
    getPlayer(){
        return this.player;
    }
    getMap(){
        return this.gamemap;
    }
}