class Player{
    isAlive: boolean = false;
    maxHealth: number;
    currentHealth: number;
    isPlayerAlive(): boolean{
        this.checkHealth();
        return this.isAlive;
    }
    checkHealth(){
        this.isAlive = this.currentHealth > 0 ? true : false;
    }
}