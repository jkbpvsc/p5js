void setup(){
  size(1000,1000);
  smooth();
  //background(22,22,29);
  stroke(random(100,255),random(30,75));
  background(255);
}
float x=500;
float y=500;
float x2=500;
float y2=500;
float x3=500;
float y3=500;
float xr=500;
float yr=500;
float i=0;
float strokeW=3;

void draw(){
 

  if(strokeW>0.005){
    for(int i=0;i<1;i++){
      if(random(1000)>=999){
        strokeW=2;}
      drawPoly(x,y,x2,y2,x3,y3);
      
      x3=x2;
      y3=y2;      
      x2=x;
      y2=y;
      x=xr;
      y=yr;
      strokeWeight(strokeW);
      strokeW=strokeW*random(0.95,0.99);
    }
    if(random(1000)>=998){
        drawEl(xr,yr);}
  xr=randomDistance(x);
  yr=randomDistance(y);
 }
 else{
    i=0;
    x=500;
    y=500;
    x2=500;
    y2=500;
    x3=500;
    y3=500;
    xr=500;
    yr=500;
    strokeW=3*random(0.8,1.2);
    //stroke(random(0,250),random(75,150),random(75,150),random(75,250));
    stroke(random(0,50),random(170));
  }
  }

void drawPoly(float x,float y, float x2, float y2, float x3, float y3){
  line(x,y,xr,yr);
  line(x2,y2,xr,yr);
  line(x3,y3,xr,yr);
  
  
  
}
void drawEl(float x, float y){
  float a=random(10);
  noStroke();
  fill(random(255),random(0,100));
  ellipse(x,y,a,a);
}
  
public float randomDistance(float x){
  float xrandom;
  float dist=20;
  float det=random(20);
  if(det<=10){
  xrandom=x+random(dist);
  }else{
    xrandom=x-random(dist);
  }
  return xrandom;
}
  
  