// Reference from Garrit
// https://pixelkind.github.io/foundationsofprogramming/programming/15-07-example
const Max_width = 600;
const Max_height = 600;
let speed; 
const g = 1.03;
let y ; 
let G ;   
let large;  
let fuel;

    
// center point
const cx = 300; 
const cy = 300; 
// Game condition 1 means running 0 means not running
let condition= 0;
// for star x, y position size and light
let sx = [];
let sy = [];  
let ss = []; 
let sa = [];  
       
              
// main program
basic_condition();
Stars();  
function draw(){  
    clear();
    background(29, 29, 29);  
    draw_Stars();
    static_scene();
    check(); 
}  
function mouseClicked(){
    if(condition === 0){
        condition = 1;

    }else if(y>=520){
        basic_condition();
    }
} 
//  speed coculate 
function Speed(y){
    speed = (y - y/G)*10; 
    // console.log(speed);

    return speed;
}
// move program 
function move(){     
                   
    if(y<520){  
        Text_of_ship_condition();
        y *= G;  
        if(fuel>0){
                         
            if (keyIsDown(32)){
                Fuel_func(); 
                G -= 0.001; 
                if(large<=15){
                    large += 1; 
                }
            }
            else if(G < g){   
                G += 0.0008;   
                if (large>0){ 
                    large -= 2; 
                }
            }
        }     
        else{    
            if (G < g){
                G += 0.0015;  
            }
            if(large>0){
                large -= 2; 
            }
        }
    }
    else{ 
        large = 0;  
    }
    
    
} 
     
// ship 
function ship(){
    push(); 
    fill(255,255,255);
    beginShape(); 
    vertex(cx-3, y+30);
    bezierVertex(cx-5,y+30,cx,y+30+large,cx,y+30+large); 
    bezierVertex(cx,y+30+large,cx+5,y+30,cx+3,y+30);        
    endShape();   
    pop();

    push();
    stroke(255,215,0);
    line(cx+15,y+30,cx+20,y+40);
    line(cx-15,y+30,cx-20,y+40);
    line(cx-17,y+40,cx-23,y+40);
    line(cx+17,y+40,cx+23,y+40);
    // pop();

    push();
    fill(100,100,100);
    // y=550;  
    beginShape(); 
    stroke(255,215,0);
    strokeWeight(0.5); 
    rect(cx-15,y,30,30);
    triangle(cx-15,y,cx,y-5,cx+15,y);
    triangle(cx-15,y,cx-20,y+15,cx-15,y+30);
    triangle(cx+15,y,cx+20,y+15,cx+15,y+30);
    line(cx-15,y,cx+15,y+30);
    line(cx-15,y+30,cx+15,y);
    pop();

    // push();
    fill(0,0,0);
    ellipse(cx,y+15,20,20); 
    pop(); 
}
 
// static scene
function static_scene(){
    push();
    fill(105, 105, 105);
    ellipse(cx,cy+400,1300,310);

    push();
    translate(cx-200,cy+253);
    rotate(PI/1.015);
    beginShape();
    vertex(45, 0);
    bezierVertex(50, -5,55, -15,70,-15);
    endShape();
    beginShape();
    vertex( -45, 0);
    bezierVertex(-50, -5,-55, -15,-70,-15);
    endShape();
    ellipse(0,0,90,13);
    pop();

    push();
    translate(cx-100,cy+300);
    rotate(PI/1.01);
    beginShape();
    vertex(40, 0);
    bezierVertex(45, -5,55, -15,70,-15);
    endShape();
    beginShape();
    vertex( -40, 0);
    bezierVertex(-45, -5,-55, -15,-70,-15);
    endShape();
    ellipse(0,0,80,20);
    pop();

    push();
    translate(cx+55,cy+350);
    beginShape();
    vertex(50, 0);
    bezierVertex(50, 0,55, 15,80,15);
    endShape();
    beginShape();
    vertex( -50, 0);
    bezierVertex(-50, 0,-55, 15,-70,15);
    endShape();
    ellipse(0,0,100,25);
    pop();

    push();
    translate(cx-250,cy+350);
    rotate(PI/1.025);
    beginShape();
    vertex(35, 0);
    bezierVertex(40, -15,55, -15,60,-15);
    endShape();
    beginShape();
    vertex( -35, 0);
    bezierVertex(-40, -15,-60, -15,-60,-15);
    endShape();
    ellipse(0,0,70,20);
    pop();

    push();
    translate(cx+250,cy+300);
    rotate(PI/0.980);
    beginShape();
    vertex(35, 0);
    bezierVertex(40, -15,55, -15,60,-15);
    endShape();
    beginShape();
    vertex( -35, 0);
    bezierVertex(-40, -15,-60, -15,-60,-15);
    endShape();
    ellipse(0,0,70,15);
    pop();
} 
  
// dynamic scene
function  Stars(){
    
    for (let i = 0; i<300; i++){   
        const x = Math.floor(Math.random() * Max_width);
        const y = Math.floor(Math.random() * Max_height);
        const s = Math.floor(Math.random() * 3);
        let a = Math.random();
        sx.push(x);
        sy.push(y);  
        sa.push(a);
        ss.push(s);
    }

}
function draw_Stars(){
    for (let i in sx){
        push();
        fill(255,255,255,Math.abs(Math.sin(sa[i])*255));
        strokeWeight(0); 
        ellipse(sx[i],sy[i],ss[i]);
        sa[i]+=0.02;
        pop();  
    }

}
function Text_of_ship_condition(){
    push();
    textSize(15);
    text("Speed :"+Math.floor(Math.abs(speed))+"m/s", cx-250, cy-200); 
    text("Fuel :"+Math.floor(fuel)+"%", cx-250, cy-180);  
 
    pop();
}

// fuel calculate
function Fuel_func(){
        fuel-=1;                
}

// judge
function judge(){
    if (speed<40&&y>=520){
    push();
    fill(255, 255, 255);
    textFont();
    textAlign(CENTER);
    textSize(45);
    text("Mission Complete! :)", cx, cy);  
    push();
    textSize(15);
    text("Click on the screen to restart the game", cx, cy+100); 
    pop(); 
    pop(); 

     
    
    } else if(y>=520){
    push();
    fill(255, 255, 255);
    textFont();
    textAlign(CENTER);
    textSize(45);
    text("Mission Failed :(", cx, cy);    
    push();  
    textSize(15);
    text("Click on the screen to restart the game", cx, cy+100); 
    pop(); 
    pop();    

    }
}
    

 
// game condition check
function check(){  
    if(condition === 1){
        ship();    
        Speed(y); 
        move(); 
        judge();
    }else{
    start();
    } 
}  
 
// start page  
function start(){
    push();
    fill(255, 255, 255);
    textFont();
    textAlign(CENTER);
    push();
    textSize(80);
    text("Starfield", cx, cy); 
    pop();  
    textSize(12);
    text("land the craft with a speed of less than 40m/s." , cx, cy+300);
    text( "Use caution with limited fuel", cx, cy+320); 
    textSize(15);
    text("Click on the screen to start the game", cx, cy+200); 
    pop(); 
}  
function basic_condition(){
    y = 20;  
    G = 1.03;   
    large = 0;  
    fuel = 100;
    condition= 0;
} 

