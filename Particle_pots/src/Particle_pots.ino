#include <Arduino.h>

// This #include statement was automatically added by the Particle IDE.
#include "MMA7660.h"


MMA7660 accelerometer;
void setup()
{
  Wire.setSpeed(100000); //clock speed
  Wire.begin();
  accelerometer.init(); //prep accelerometer
  Serial.begin(9600);
}




void loop()
{

  MMA7660_ACC_DATA accelData; //data structure for acceleration data



  accelerometer.getAcceleration(&accelData); //get accel data from accelerometer

  if ((accelData.z.g > 1.4) || (accelData.z.g < 0.6)){ //publish only if 'event' has occured
    Serial.print("event");
    Serial.println(accelData.z.g);
    String z_val = String(accelData.z.g); //convert float to string

    Particle.publish("z_val", z_val, PRIVATE); //publish z value

  }
  /* Serial.println("accleration of X/Y/Z: ");

  Serial.print(accelData.x.g); //print x acceleration
  Serial.println(" g");

  Serial.print(accelData.y.g); //print y acceleration
  Serial.println(" g");

  Serial.print(accelData.z.g); //print z acceleration
  Serial.println(" g");
  Serial.println("*************"); */
  delay(500);




}
