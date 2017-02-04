#include <Arduino.h>

// This #include statement was automatically added by the Particle IDE.
#include "MMA7660.h"


MMA7660 accelerometer;
void setup()
{
  Wire.setSpeed(100000);
  Wire.begin();
  accelerometer.init();
  Serial.begin(9600);
}




void loop()
{
  int8_t x;
  int8_t y;
  int8_t z;
  float ax,ay,az;
  MMA7660_ACC_DATA accelData;

  accelerometer.getXYZ(&x,&y,&z);


  Serial.print("x = ");
    Serial.println(x);
    Serial.print("y = ");
    Serial.println(y);
    Serial.print("z = ");
    Serial.println(z);

  //accelerometer.getAcceleration(&ax,&ay,&az);
  accelerometer.getAcceleration(&accelData);
    Serial.println("accleration of X/Y/Z: ");
//  Serial.print(ax);
Serial.print(accelData.x.g);
  Serial.println(" g");
//  Serial.print(ay);
Serial.print(accelData.y.g);
  Serial.println(" g");
  //Serial.print(az);
  Serial.print(accelData.z.g);
  Serial.println(" g");
  Serial.println("*************");
  delay(2000);

//int z_test = 44;

String z_val = String(accelData.z.g);

  Particle.publish("z_val", z_val, PRIVATE);
  delay(5000);
}
