
void setup(){
  size(1020, 1020);
  
  
}
public float x=510;
public float y=510;
void draw(){
  
  if (mousePressed) {
    fill(0);
  } else {
    fill(255);
  }
 if(random(2)<=1){
   x=x-random(5);
 }
 else{
 x=x+random(5);
 }
 
 if(random(2)<=1){
   y=y-random(5);
 }
 else{
 y=y+random(5);
 }
  ellipse(x, y, 80+random(0,5), 80+random(5));
  
}
    