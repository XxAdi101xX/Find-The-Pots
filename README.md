# Find The Pots
FindThePots is a hardware and webapp combination that detects and maps the location and size of potholes in real-time as a user drives around. This data is interpreted by the webapp to provide route recommendations to avoid roads with known potholes.

The pothole sensor was made with an accelerometer attached to a Particle Photon sensor. Accelerometer values are obtained, and processed within the microcontroller to determine if a pothole has been hit. In addition a magnitude value of 1, 2, or 3 corresponding to the severity of the pothole was calculated.

For safety reasons, FindThePots requires no input from the user (such as a confirmation notification when a pot hole is hit) and can be run completely either alone or with the webapp loaded. This way, drivers aren't at risk of distracted driving.

The Photon was integrated together with Google Cloud Platform and sent data using the Publish/Subscribe Idiom where it is then processed through a node.js server and eventually displays on the google maps UI. Additional server-side code uses this data to create new routes based on this information.

The front end application can be found at gs_pot_servers/1-hello-world/index.html.
Feel free to choose an option for beginning and destination to take a look at the pre-existing data on potholes that we have imported from the server and checkout the optimized google maps routes that use the pothole data to avoid roads with pothole alongside with the route specifications on the side nav as well!
<br /> <br />
<b>Find the Pots Interface</b>
![Alt text](https://github.com/vhenri/Find-The-Pots/blob/master/Find%20the%20Pots.PNG?raw=true)
