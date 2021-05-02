import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl{
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;
    direction="";
    speed:number=300;
    isLive:boolean=true;
    constructor(){
        this.snake=new Snake();
        this.food=new Food();
        this.scorePanel=new ScorePanel();
        this.init();
    }
    init(){
       
       document.addEventListener("keydown",this.keyDown.bind(this));
        this.run();

    }
    keyDown(event:KeyboardEvent){
        if(this.direction===""){
             this.direction=event.key; 
        }
        if(this.direction==="ArrowUp"&&event.key==="ArrowDown"){
            this.direction="ArrowUp";
        }else if(this.direction==="ArrowLeft"&&event.key==="ArrowRight"){
            this.direction="ArrowLeft";
        }
        else if(this.direction==="ArrowDown"&&event.key==="ArrowUp"){
            this.direction="ArrowDown";
        }
        else if(this.direction==="ArrowRight"&&event.key==="ArrowLeft"){
            this.direction="ArrowRight";
        }else{
            this.direction=event.key;
        }
        
        
       
    }
    ifEat(X:number,Y:number){
       
       return X===this.food.X&&Y===this.food.Y;
      
    }
    run(){ 
        
        let X=this.snake.X;
        let Y=this.snake.Y;
        
        switch(this.direction){
            case "ArrowUp":
            case "Up":
                Y-=10;
                break;
            case "ArrowDown":
            case "Down":
                Y+=10;
                break;
            case "ArrowLeft":
            case "Left":
                X-=10;
                break;
            case "ArrowRight":
            case "Right":
                X+=10;
                break;

        }
        if(this.ifEat(X,Y)){
            
            this.food.change();
            this.snake.addBody();
            
            this.scorePanel.addScore();
            
            if(this.scorePanel.score%50===0){
                this.scorePanel.addLevel();
                this.speed-=50;
            }
           
        }
        
       this.snake.moveBody();
        try{
        this.snake.X=X;
        this.snake.Y=Y;
        
    }
        catch(e){
            this.isLive=false;
            alert(`游戏结束，你的分数为${this.scorePanel.score}你通了${this.scorePanel.level}关`);
        }
        
        this.isLive&&setTimeout(this.run.bind(this),this.speed);
        

    }





}
export default GameControl;