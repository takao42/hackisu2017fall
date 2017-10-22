# hackisu 2017 fall

We thought about making something that would influence the community and we were looking to particularly focus on health. Imagine a patient with a forgetful memory ,they might have to take some certain pills. This project Makes sure that they do that and that the doctor knows and tells them to take it.

The way it works is really simple, time for a pill? A doctor presses on a button informing the patient by the led on the bottle, the led flashes several colors. Once the patient takes it, it sends a pop up back to the doctor with the count of the times the patient have took a pill.

We put a touch sensor inside the prescription bottle and once the patient touches that, the dragonboard 410c keeps tracks of that and sends it to our server made by node.js. if the doctor wants the patient to take a pill, he presses the button through the web app made through angular js and that sends it back to the server which sends it to the dragonboard which in turn makes the led screen flash several lights and with the touch sensor we can know if the patient responded to that led or not, again sending it back to the server and to the web app making sure the the doctor gets informed with how many times the patient took the pill. This not only works from a computer but even a mobile web browser and they keep in sync. The touch signal is sent to all the clients (doctors' PCs) and it shows the count of pills taken as well.

Surprisingly, There is not enough material on actually using the groove led with the dragonboard, just making all the hardware work together was a bit problematic.

We came to the hackthon, looking for something to do, we came out with more practical training and knowledge about embedded system and servers. Not to forget the implantation of this project in the actual medical field. I would say that is a lot.

Obviously this being a hackithon, means we can't always do all what we want to do. We want to make users and clients in our server and web apps so that this can be used across different users. Another thing is actually letting the patient know the number of pills he has to take through the led.We would also like to integrate it with more sensors to make it more accurate and use a better smaller micro board.
