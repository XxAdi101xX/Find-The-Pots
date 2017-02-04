#include <Arduino.h>

// This #include statement was automatically added by the Particle IDE.
#include "MMA7660.h"


MMA7660 accelemeter;
void setup()
{
  Wire.setSpeed(120);
  Wire.begin();
  accelemeter.init();
  Serial.begin(9600);

  // Subscribe to the integration response event
  Particle.subscribe("hook-response/z_val", myHandler, MY_DEVICES);

}
void loop()
{


// accelemeter stuff
  int8_t x;
  int8_t y;
  int8_t z;
  float ax,ay,az;
  accelemeter.getXYZ(&x,&y,&z);

  Serial.print("x = ");
    Serial.println(x);
    Serial.print("y = ");
    Serial.println(y);
    Serial.print("z = ");
    Serial.println(z);

  accelemeter.getAcceleration(&ax,&ay,&az);
    Serial.println("accleration of X/Y/Z: ");
  Serial.print(ax);
  Serial.println(" g");
  Serial.print(ay);
  Serial.println(" g");
  Serial.print(az);
  Serial.println(" g");
  Serial.println("*************");
  delay(500);

//int z_test = 44;

String z_val = String(az);

  Particle.publish("z_val", z_val, PRIVATE);
  delay(5000);
}

void myHandler(const char *event, const char *data) {
  // Handle the integration response
  Serial.println("event");
}
