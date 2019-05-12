void setup(){
size(1920,1080);
background(255);
stroke(0,150);

}
float[]x={960,960,960};
float[]y={540,540,540};
int a;
float reach=10;
int t=1;

void draw(){
  if(mousePressed){
    while(t<2){
  a=round(random(2));
  x[a]=mouseX;
  y[a]=mouseY;
  fill(random(255),random(255),random(255),50);
  triangle(x[0],y[0],x[1],y[1],x[2],y[2]);
  
  t++;
 }
}else{
   t=1;}
 if(keyPressed){
 save("CPoly.png");}
}
  
  