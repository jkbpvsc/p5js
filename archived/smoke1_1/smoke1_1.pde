
void setup() {
  size(1020, 1020);
  background(15);
  //noStroke();
}
public float x=510;
public float y=510;
public float a=80;
public float b=80;
public int z=-1;
public float r=0.20;
public float deg=0.05;

void draw() {

  if(x<0){
    x=x+random(r)*a;
  }
  if(x>1020){
    x=x-random(r)*a;
  }else{
    x=x-random(-r, r)*a;}
    
  if(y<0){
    y=y+random(r)*a;
  }
  if(y>1020){
    y=y-random(r)*a;
  }else{
    y=y-random(-r, r)*a;}
    
  
 /* if(a<0.1)
  {
    deg=deg*-1;
  */
  if(a>80){
    deg=deg*-1;}

  if(a<0.1) {
    a=80;
    b=80;
    x=510+random(-20,20);
    y=510+random(-20,20);}
  
    a=a-deg;
  b=b-deg;
  
  //if(a<0){
  //z=1;
  //}
  //if(a==80){
  //z=-1;
  //}


  //a=a+(z*0.2);
  //b=b+(z*0.2);
  fill(random(100, 250), random(10, 80), random(80, 100),random(150,180)); 
  ellipse(x, y, a, b);
  a=a-deg;
  b=b-deg;
}