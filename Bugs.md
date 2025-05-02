# Bugs Documentation

## Bug1: Static Image Rendering on option select
Selected room doesn't change after on change. Image is static

### Line number 
main.js: 206
### Bug type
Type mismatch
### Identification Method
Identified using console.log(option.value): value expects a string but the room object is what is assigned.
### fix
assigned room name to option's value using (room.name)


## Bug2: Wrong Temperature overlay gradients
Variables warmOverlay and coolOverlay are interchnaged so there's unexpected behaviour.

### Line number 
main.js: 145 and 151
### Bug type
naming error
### Identification Method
Identified hovering over gradients
### fix
interchanged variable names

## Bug3: Mouse pointer over everywhere including uninteractive elements
Mouse pointer over uninteractive elements and overall UI
### Line number 
style.css: 38
### Bug type
UI/UX 
### Identification Method
Identified hovering UI
### fix
deleted cursor: pointer property from .container class


## Bug4: Hardcode and inconsistent naming convention
Initial room is set to living room by hardcode and class name for current temperature uses camel casing
### Line number 
index.html: 39 and 40
### Bug type
Static UI text-content and inconsistent name convention
### Identification Method
Identified by observation
### fix
clearded hardcode and changed class name to snake case convention

## Bug5: Initial room undisplayed after clearing harccode
Initial room is not displayed on the room card after clearing hardcode
### Line number  
main.js: 153 (setInitialOverlay())
### Bug type
missing logic
### Identification Method
Identified by reading code
### fix
added logic to set initial room name to the first room in the rooms object and changed function name to setInitialOverlay() to depict its purpose for code readability

## Bug6: Button Increase and Decrease Handlers
Loss of this keyword due to calling increaseRoomTemperature(). since it is not a function this.currTemp++ doesn't work 
### Line number  
main.js: 247
### Bug type
Not a functon and a syntax error
### Identification Method
Identified using console.log()
### fix
replacing function call with the direct method since assigning the method before calling it in the if logic also loses copies the reference without binding it to the room object.

## Bug7: Static Button Background colors 
When warm or cool, button background colors are set to remain static 
### Line number  
main.js: 257, 258, 278, 279
### Bug type
UI/UX
### Identification Method
Identified reading code base
### fix
created a function (changeBtnBackgroundColor()) to conditionally set background colors for warm and cool buttons


## Bug8: Min and max values for input 
The Html minimum abd maximum inputs are wrongly set looking at the tempearture ranges given.
### Line number  
index.html: 103, 104, 110, 111
### Bug type
input constraint bug
### Identification Method
Identified interacting with UI using browser dev-tools
### fix
updated min and max values correctly


## Bug9:  Wrong UI feedback on room AC switch
When current room temperature is warm, AC switch on romm displays "cooling room to:..."
### Line number  
main.js: 352
### Bug type
logic error
### Identification Method
Identified reading code base and UI interaction
### fix
changed greater than sign to less than 


## Bug10:  Wrong comparison in preset handler
input values for warm and cool are strings but being compared with numbers. 
### Line number  
main.js: 309, 314
### Bug type
type error
### Identification Method
Identified using console.log()
### fix
changed greater than sign to less than 


## Bug11:  Empty event handler for default settings
The delegated event handler for displaying the configured temperatures is empty which in turn does nothing when warm or cool buttons are clicked.
### Line number  
main.js: 239
### Bug type
type error
### Identification Method
Identified using console.log()
### fix
changed greater than sign to less than 




## Bug12:  Validation check for cool and warm
The validation logic are separate for warm and cool. It checks for only one tempearture at a time and as a result only one error shows at a time.
### Line number  
main.js: 307 - 317
### Bug type
logic error
### Identification Method
Identified reading code base and interacting with UI.
### fix
Changed logics to check for both warm and cool conditions at the same time.



## Bug13:  Duplicate querries on the same DOM element
Dom elements ".current-temp, .room, and others are querried multiple times which can influence performance and slow the application
### Line number  
main.js: 225, 227, 281
### Bug type
performance issue
### Identification Method
Identified reading code base
### fix
cached all selectors in variables 

