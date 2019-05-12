
void setup(){
  size(1020, 1020);
  
  
}
public float x=510;
public float y=510;
public float a=80;
public float b=80;
public int z=-1;

void draw(){
  

 if(random(2)<=1){ //movement
   x=x-random(5);
 }else{
 x=x+random(5);
 }
 if(random(2)<=1){
   y=y-random(5);
 } else{
 y=y+random(5);
 }
 if(a<0){
   z=1;
 }
 if(a==80){
   z=-1;
 }
   
 
 a=a+(z*0.2);
 b=b+(z*0.2);
 
ellipse(x , y , a , b);

  
}
    