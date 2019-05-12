
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
public float r=0.10;
public float deg=0.2;

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
    
  
  if(a<0.1)
  {
    deg=deg*-1;
  }
  if(a>80){
    deg=deg*-1;}

  /*if (a<0.1) {
    a=80;
    b=80;
    x=x+random(-100, 100);
    y=y+random(-100, 100);
    if ((x<0||x>1020)||(y<0||y>1020))
    x=random(width);
    y=random(height);
  }*/
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
  fill(random(100, 250), random(10, 80), random(80, 100)); 
  ellipse(x, y, a, b);
}