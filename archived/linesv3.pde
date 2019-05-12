import ddf.minim.*;
AudioPlayer player;


PShape globe;
  
import processing.video.*;

Capture cam;
Minim minim;
int points=300;
float[][] map= new float[2][points];
PImage img;

  
public void setup(){
  size(640,480);
  //background(0);
  strokeJoin(ROUND);
  strokeCap(ROUND);
  stroke(255);
  minim = new Minim(this);
  player = minim.loadFile("6.mp3");
  frameRate(60);
  player.play();
  smooth();
  //img = loadImage("aphex.jpg");
  //imageMode(CENTER);
  //image(img,width/2,height/2);
  filter(GRAY);
  filter(POSTERIZE,10);
    String[] cameras = Capture.list();
  
  if (cameras.length == 0) {
    println("There are no cameras available for capture.");
    exit();
  } else {
    println("Available cameras:");
    for (int i = 0; i < cameras.length; i++) {
      println(cameras[i]);
    }
    
    // The camera can be initialized directly using an 
    // element from the array returned by list():
    cam = new Capture(this, cameras[4]);
    cam.start();     
  } 
  
}


boolean fill=false;
float s=1;
float s2=10;
float s1=s;
float x1=0;
float x2=0;
float y1=0;
float y2=0;
float d;
float r=5;
float r2=40;
float p=500;
int xr=500;
int yr=500;
boolean lock=false;
float lr=15;
float spread=70;
float spread2=1000;






public void draw(){
  if(cam.available()) {
    cam.read();
  }
  float ratio= player.bufferSize()/points;
  /* image(img,width/2,height/2);
  filter(GRAY);
  for(int i=0;i<points;i=i+0){
  int point=(int)random(size);
  int xm=(int)random(width);
  int ym=(int)random(height);
  if(random(100)<(red(get(xm,ym))/2.55)){
    map[0][point]=xm;
    map[1][point]=ym;
    i++;
    //point(x,y);
  }}
  background(0);*/
  if(fill==false){
    imageMode(CENTER);
    image(cam,width/2,height/2);
  //filter(GRAY);
  //filter(POSTERIZE,20);
  filter(THRESHOLD);
  for(int i=0;i<points;i=i+0){
  int point=(int)random(points);
  int xm=(int)random(width);
  int ym=(int)random(height);
  if(random(100)<(red(get(xm,ym))/2.55)){
    map[0][point]=xm;
    map[1][point]=ym;
    i++;
    //point(x,y);
  }}
    }
    //fill=true;
  background(0);
  
  for(int a=0;a<points;a++){
    x1=map[0][a];
    y1=map[1][a];
    for(int x=0;x<points;x++){
      float pp=player.mix.get(x*(int)ratio);
      if(pp<0){
        pp=pp*-1;}
      if(x!=a){
        x2=map[0][x];
        y2=map[1][x];
        d=sqrt(pow((x2 -x1),2) + pow((y2 -y1),2));
       //System.out.println(d);
        //System.out.println("("+x1+","+y1+") ("+x2+","+y2+")");
      if((d<(r+(r2*pp))||(random(10000000)>9999999))){
        stroke(255,150+random(105));
        strokeWeight(random(1)+pp);
      line(x1,y1,x2,y2);
      } }
      
    }
   
  }
  for(int x=0;x<points;x++){
    float pp=player.mix.get(x*(int)ratio);
      if(pp<0){
        pp=pp*-1;}
   // map[1][x]=map[1][x]+random(-s-(s2*pp),s+(s2*pp));
    //map[0][x]=map[0][x]+random(-s-(s2*pp),s+(s2*pp));
      
}
if(random(1000)>0){
  for(int a =0;a<points;a++){
    float pp=player.mix.get(a*(int)ratio);
      if(pp<0){
        pp=pp*-1;}
  for(int o=points/8;o<(int)random(points*pp);o++){      
  int i =(int)random(points);
  float angle = i* TWO_PI / points;
  float ran=random(spread+spread2*pp);
      //map[1][i]= width/2 + cos(angle) * (lr+ran);
      //map[0][i] = height/2+ sin(angle) * (lr+ran);
      
}}
if(random(10)>6){
        int ran=(int)random(points);
  //map[0][ran]=500+random(-p,p);
 //map[1][ran]=500+random(-p,p);
 }
}
if(mousePressed==true){
  if(lock==false){
  xr=(int)random(points);
  yr=(int)random(points);}
  //lock=true;
  s=0;
  
  map[0][xr]=mouseX+random(-10,10);
  map[1][xr]=mouseY+random(-10,10);}
  if(mousePressed==false){
    lock=false;
  s=s1;}
  
  
}