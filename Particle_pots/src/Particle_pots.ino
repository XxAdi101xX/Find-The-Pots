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
  int eventType; // 0=no event, 1=minor, 2=moderate, 3=major
  MMA7660_ACC_DATA accelData; //data structure for acceleration data
  int count = 0; //keeps track of duration of 'event'


  accelerometer.getAcceleration(&accelData); //get accel data from accelerometer
  Serial.println(accelData.z.g);

  while ((accelData.z.g > 1.4) || (accelData.z.g < 0.6)){ //publish only if 'event' has occured
    count = count + 1;
    accelerometer.getAcceleration(&accelData); //get accel data from accelerometer
    Particle.process();
    Serial.println(accelData.z.g);
    Serial.print("count: ");
    Serial.println(count);
    delay(50);
  }
  if (count < 2){ //no event
    eventType = 0;
  }
  else if (count < 5){ //minor pothole event
    eventType = 1;
  }
  else if (count < 10){ //moderate pothole event
    eventType = 2;
  }
  else{             //major pothole event
    eventType = 3;
  }
  Serial.println(eventType);
    Particle.process();

  if (eventType != 0){
    String z_val = String(eventType); //convert float to string

    Particle.publish("z_val", z_val, PRIVATE); //publish event type

  }

  delay(500);




}
