import * as $ from 'jquery';
class Snake{
    head:JQuery;
    element:JQuery;
    body:JQuery;
    constructor(){
        this.head=$(".snake> .header");
        this.element=$(".snake")

       this.body=$("");
        

    }
    get X(){
        return this.head.position().left;
    }
    get Y(){
        return this.head.position().top;
    }
    set X(value:number){
        if(this.X===value){
            return;
        }
        if(this.X<=0||this.X>282){
            throw new Error("游戏结束");
        }

        this.head.css("left",value+"px")
    }
    set Y(value:number){
        if(this.Y===value){
            return;
        }
        if(this.Y<=0||this.Y>286){
            throw new Error("游戏结束");
        }
        this.head.css("top",value+"px")
    }

    addBody(){
      
        this.element.append("<div></div>"); 
         this.body=$(".snake>div:first").nextAll();
        
        this.body.each(function(index,domEle){
            $(domEle).css({
        "width":"10px",
        "height":"10px",
        "backgroundColor":"#000",
        "border":"1px solid #b7d4a8",
        "position":"absolute",
        
          });
           
        });
        
           
       
        
       
    }
    moveBody(){
       
        
            for(let i=this.element.children().length-1;i>0;i--){
                
                let X=$(this.element.children()[i-1]).css("left");
                let Y=$(this.element.children()[i-1]).css("top");
               
              
                $(this.element.children()[i]).css("left",X);
                $(this.element.children()[i]).css("top",Y);
               
            }
       
       
            
      
   
    }


}
export default Snake;