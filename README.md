# PHOTO COLLAGE

Photo collage project. It's build with react-native, typescript and unsplash api.

## get started

To make use of the unsplash api you need at least a free development acces token, i removed mine from the project. 
Add it inside the pages/Home/Home.tsx file line 14. Without the accestoken in place it doesnt load the list and the whole app is just a whitescreen 
(I removed the header).

clone project

1. git clone https://github.com/beterfysiek/photo-collage.git

build node modules

2. yarn

run ios

3. yarn ios

run android

4. yarn android

### TODOS

the project is a small project and is not complete yet. 
The following features are still left to do:
- The MasonryList library that i used is questionable, the library should be forked and maintained or use a different library for the list
- The "SWIPE TO SEE OTHER IMAGES" screen should only show once but it returns on every build. It can be done with something like async storage
- No unit, component, iu, e2e or other tests are in place.
- splash screen missing
- icon missing
- swipe gestures on android do not always respond, might look for alternative
- disable swiping while images are not completly loaded can prevent some strange behavior when swiping to fast on full screen modal
- text animation on full screen mode
- animation on modal close

These are the most important ones but more can be added
