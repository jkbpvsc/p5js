
void setup(){
  size(1020, 1020);
  background(10);
  noStroke();
  
  
}
public float x=510;
public float y=510;
public float a=80;
public float b=80;
public int z=-1;
public float r=0.05;

void draw(){
  
if(mousePressed){
  x=mouseX;
  y=mouseY;
  while(a>0){
 
 if(random(2)<=1){ //movement
   x=x-random(r)*a;
 }else{
 x=x+random(r)*a;
 }
 if(random(2)<=1){
   y=y-random(r)*a;
 } else{
 y=y+random(r)*a;
 }
 
 //if(a==0){
   //break;
 //}
 a=a-0.025;
 b=b-0.025;
 //if(a<0){
   //z=1;
 //}
 //if(a==80){
   //z=-1;
 //}
   
 
 //a=a+(z*0.2);
 //b=b+(z*0.2);
//noStroke();
fill(random(150,200),random(10,70),random(20,80),random(255));
ellipse(x,y,a,b);

  }
 a=80;
 b=80;
}
}