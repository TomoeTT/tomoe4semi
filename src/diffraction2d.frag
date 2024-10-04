precision highp float;

uniform vec2 uResolution;
uniform float u_time;
uniform float N;

out vec4 fragColor;

//#define N 30.0
void main(){
  //float N = 9.0;
  vec2 p = gl_FragCoord.xy / uResolution.x;
  float mag = 100.0;
  p *= 2.0*mag;
  p -= vec2(mag,mag*uResolution.y/uResolution.x);
  //float N = 18.0;
  float R = 100.0;
  float PI = 3.14159;
  float intensity = N; //明るさ
  float maximum = N;
  float x[100];
  float y[100];
  for(int i = 0; float(i)<N; i++){
    x[i] = cos(float(i)*2.0*PI/N);
    y[i] = sin(float(i)*2.0*PI/N);
  }
  /*x[0] = 0.0;
  y[0] = 0.0;
  x[1] = 1.0;
  y[1] = 0.0;
  x[2] = -1.0;
  y[2] = 0.0;
  x[3] = 0.0;
  y[3] = 1.0;
   x[4] = 0.0;
  y[4] = -1.0; */
/*for(int i = -1; i<=1; i++){
  for(int j = -1; j<=1; j++){
    x[(i+1)*3+(j+1)] = float(i);
    y[(i+1)*3+(j+1)] = float(j);
  }
}
/*x[9] = 2.0;
y[9] = 0.0;
x[10] = 0.0;
y[10] = 2.0;*/


  for (int i = 1; float(i)<N; i++){
    for (int j = 0; j<i; j++){
      float dx = x[i] - x[j]; 
      float dy = y[i] - y[j];
      //float dx = cos(i*2.0*PI/N) - cos(j*2.0*PI/N); //x座標とy座標の差
      //float dy = sin(i*2.0*PI/N) - sin(j*2.0*PI/N);
      intensity += 2.0*cos(300.0*(dx*p.x + dy*p.y)/sqrt(p.x*p.x+p.y*p.y+R*R));
      maximum += 2.0;
    }
  }
  fragColor=vec4(0,3.0*intensity/maximum,0,1);
  //if (p.x > 0.0){
  //  fragColor=vec4(0,1,0,1);
  //}else{
  //  fragColor=vec4(1,0,0,1);
  //}    
}
