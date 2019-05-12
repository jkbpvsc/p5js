void setup(){
  size(1920,1080);
  smooth();
  //noLoop();
}
  float x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7;
  float a=50;
  float x=0;
  float y=0;
  float dx=a/2;
  float dy=(sqrt(3)/2)*a;
  float xr=0;
  float yr=2*dy;
  float d=1;
  
  
  
void draw(){
 x1=x;
 x2=x1-dx;
 x3=x1-dx+a;
 x4=x1+a;
 x5=x1;
 x6=x1+a;
 x7=x1+a+dx;
 y1=y;
 y2=y1+dy;
 y3=y1+dy;
 y4=y1;
 y5=y1+2*dy;
 y6=y1+2*dy;
 y7=y1+dy;
 fill(255-d*10);
 stroke(0+d*10);
 quad(x1,y1,x2,y2,x3,y3,x4,y4);
 quad(x2,y2,x5,y5,x6,y6,x3,y3);
 quad(x4,y4,x3,y3,x6,y6,x7,y7);
 y=y+yr;
 if((y)>1080){
   if(d%2==0){
     y=0;
   }else{
   y=0-dy;}
   x=x+a+dx;
   d++;
 }
 if(keyPressed){
   save("hexagon.png");
 }
 
 
}