void setup(){
  size (1920,1080);
  background(0);
  noStroke();
}
float x=960;
float y=540;
float a=0;
float b=7;
float zoom=10;
float reach=50;

void draw(){
  background(21,21,29);
  //if(mousePressed){
  for(float i=0.1;i<500;i=i+0.5){
    x=960+((i*2)*sin(i/a)/zoom);
    y=540-((i*2)*cos(i/b)/zoom);
    //fill((255-i/16),(50),(120),(i));
    ellipse(x,y,1+i/20,0+i/20);
    stroke(255,100);
    strokeWeight(0.05);
    //line(x,y,960+((((i-reach)*2)*sin(i-reach)/1/a)/zoom),540-(((i-reach)*2)*cos((i-reach)/b)/zoom));
    noStroke();}
//}
a=a+0.005;
//b=b+0.005;

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
  