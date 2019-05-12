void setup(){
  size (1920,1080);
  background(21,21,29);
  noStroke();
}
float x=960;
float y=540;

void draw(){
  for(float i=0.1;i<10000;i=i+0.1){
    x=960+((i*2)*sin(i/2.0)/3);
    y=540-((i*2)*cos(i/2.0)/4);
    fill((i/16),(50),(120));
    ellipse(x,y,1+i/200,0+i/200);
}
 /*for(int i=1;i<1000;i++){
    x=960-(i*2)*sin(i/6.0);
    y=540-(i*2)*cos(i/6.0);
    fill((i/4),(10),(10),(255-i/4));
    ellipse(x,y,i/10,i/10);
  }
   for(float i=0.5;i<1000;i=i+0.5){
    x=960-(i*2)*sin(i/2.0);
    y=540+(i*2)*cos(i/2.0);
    fill((i/4),(250),(120),(255-i/4));
    ellipse(x,y,i/10,i/10);}*/
}
  