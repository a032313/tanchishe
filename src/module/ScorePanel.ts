import * as $ from 'jquery';
class ScorePanel{
        score=0;
        level=1;
        scoreEle:JQuery;
        levelEle:JQuery;
        constructor(){
            this.scoreEle=$(".down span").first();
            this.levelEle=$(".down span").last();
            this.score=parseInt(this.scoreEle.text());

        }
        addScore(){
            
            this.scoreEle.text(this.score+=10);
        }
        addLevel(){
            this.levelEle.text(++this.level);

        }
        



}
export default ScorePanel;