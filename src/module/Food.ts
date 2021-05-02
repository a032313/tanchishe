import * as $ from 'jquery';
class Food{
        element:JQuery;
        constructor(){
            this.element=$(".food");




        }
        change(){
            let value=Math.round(Math.random()*29)*10;
            if(value>=10){
            this.element.css("left",value+"px");
            this.element.css("top",value+"px");
            }
            
            
            

        }
        get X(){
            return this.element.position().left;
        }
        get Y(){
            return this.element.position().top;
        }



}
export default Food;