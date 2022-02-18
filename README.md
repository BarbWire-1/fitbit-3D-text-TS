

# shadow-text
Widget for 3D effects on textElements for fitbit OS\
(instruction and usage doco will follow soon...)

!<div align="center">![image](screenshot.png)</div>

## WORK IN PROGRESS...


**Each widget instance contains 3 sub Elements**

### WIDGET-INSTANCE:

### Properties:

x, y, text, letterspacing, textAnchor\
style:\
all font-attributes, opacity, display

Additionally: \
main, light, shadow
___
### SUBELEMENTS:

(main, light, shadow)


### Properties in general:
* x, y, style: fill, opacity, display (to perhaps "mute" one of them)

### Specifics:

main: 
* x, y are fixed to x,y of the widget-instance (changes here get overwritten in widget)

light, shadow:  
* x, y for offset to main
---
Position of the whole widget instance gets set on el.x, el.y
also opacity/display can be applied directly (el.style...)

---
The widget elements have default settings which can be overwritten.

## Defaults
### main
.style.fill = "grey"\
x,y center screen\
textAnchor = "middle"

### light
.style.fill = "white"\
x = -1, y = -1 (offset to main)\
opacity = 0.5


### shadow
.style.fill = "red"\
x = 1, y = 1 (offset to main)\
opacity = 0.5 

These values can be overwritten 
* in resources/CSS using id (of instance) / class (of subElement)
* in index.view via set 
* in index.js 
---                        







This widget gets integrated by the widget-factory written by [Gondwanasoft](https://github.com/gondwanasoft/fitbit-simple-widget)

