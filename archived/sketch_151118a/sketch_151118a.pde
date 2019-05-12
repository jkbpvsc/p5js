void setup(){
  size(1000,1000);
}
float a1=60;//size of the circle, constant value
float a=a1;//size of the active circle
void draw(){
//background(0);



if(mousePressed){//only draws when mouse is pressed
if(a>0.5){//stops when the circle is small enough
  fill(random(0,255));//random colour
  
  ellipse(mouseX,mouseY,a,a);//draws circles
  a=a*0.99;//reduces the size of the circles
  

}}else{
  a=a1;}//resets the size of the circle when its small enough or when you relesae the mouse



}