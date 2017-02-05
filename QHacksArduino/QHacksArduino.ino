

#include <Wire.h>

// This #include statement was automatically added by the Particle IDE.
#include "MMA7660.h"



MMA7660 accelerometer;
void setup()
{

  accelerometer.init(); //prep accelerometer
  Serial.begin(9600);
}




void loop()
{
  int eventType; // 0=no event, 1=minor, 2=moderate, 3=major
  int count = 0; //keeps track of duration of 'event'
  int8_t x;
  int8_t y;
  int8_t z;
  float ax, ay, az;
  accelerometer.getXYZ(&x, &y, &z);
  accelerometer.getAcceleration(&ax, &ay, &az);

  while (az > 1.4 || az < 0.6) {
    accelerometer.getXYZ(&x, &y, &z);
    accelerometer.getAcceleration(&ax, &ay, &az);
    count = count + 1;
  }
//  Serial.print(count);
//  Serial.print(": ");
//  Serial.println(az);

if (count < 10) {
  eventType = 0;
}
else if (count < 100) {
  eventType = 1;
}
else if (count < 500) {
  eventType = 2;
}
else {
  eventType = 3;
}




if (eventType != 0) {

  Serial.print("event");
  Serial.println(eventType);
  String z_val = String(az); //convert float to string
  String eventTypeStr = String(eventType); //convert float to string

  // Particle.publish("Event Type", z_val, PRIVATE); //publish z value

}

delay(500);




}

