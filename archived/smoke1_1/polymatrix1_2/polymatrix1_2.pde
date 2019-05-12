void setup(){
  size(1920,1080);
  smooth();
  //background(22,22,29);
  stroke(random(100,255),random(30,75));
  background(255);
}
float h=540;
float w=960;

float x=h;
float y=w;
float x2=h;
float y2=w;
float x3=h;
float y3=w;
float xr=h;
float yr=w;
float i=0;
float strokeW=3;
float x2r;
float y2r;

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
   if(random(1000)>=950){
      i=0;
    x2r= random(1920);
    y2r= random(1080);
    x=x2r;
    y=y2r;
    x2=x2r;
    y2=y2r;
    x3=x2r;
    y3=y2r;
    xr=x2r;
    yr=y2r;
    strokeW=3*random(0.8,1.2);
    //stroke(random(0,250),random(75,150),random(75,150),random(75,250));
    stroke(random(0,50),random(40,90),random(70,150),random(170));
   }else{
     
    i=0;
    x=w;
    y=h;
    x2=w;
    y2=h;
    x3=w;
    y3=h;
    xr=w;
    yr=h;
    strokeW=3*random(0.8,1.2);
    //stroke(random(0,250),random(75,150),random(75,150),random(75,250));
    stroke(random(0,50),random(40,90),random(70,150),random(170));
   }
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
  
  