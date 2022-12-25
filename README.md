# floodlightjs
Inspired from macOS spotlight, floodlight is simple JS library that will show a search area. How the search is handled is completely on you.

You can register any key. To trigger, it will bind an event with your specified key and or key combo
| Important: `esc` closes floodlight! |
| --- |

 
<p align="center">
<img src="gifs/floodlight.gif" style="width:100%" /> 
</p>


## Installation
From CDN
```
<script src="https://cdn.jsdelivr.net/gh/rajnandan1/floodlightjs@1.0.7/dist/floodlight.min.js"></script>
```
From NPM
```
npm i floodlightjs
```
## Demo + Documentation
[Live instance of Floodlight](https://rajnandan1.github.io/floodlightjs/index.html)

## Instantiation
#### ES5
```
let fl = new FloodLight();
```
#### ES6
```
import floodlight from 'floodlightjs'
if (typeof window !== 'undefined') {
	let fl = floodlight();
}
```
## Basic Usage - Implement a call to a function `a`

The below code implements a function that will trigger an alert box with `a` Hello World. It will listen for the a key. When someone presses `a` it will run.
```
let fl = new FloodLight();

//this takes to parameters. first parameter is the `key`, second is the description
let cmdHelloWorld = fl.addCommand("a", "Alert hello world");

//Implement a function that would handle the query
let helloWorld = function() {
    alert("hello world")
};

//Add the action for a command. Takes a function as first param
cmd.addAction(helloWorld);

//Start floodlight. It will start listening
fl.run();
```
## Basic Usage - Implement a quick google search `g`

The below code implements a google search using floodgate. It will listen for the `g` key. When someone presses `g` it will show a search box.
```
let fl = new FloodLight();

//this takes to parameters. first parameter is the `key`, second is the description
let cmd = fl.addCommand("g", "Search Something in google");

//Implement a function that would handle the query. Takes one parameter
let implementSearchInGoogle = function(obj) {
	location.href = "https://www.google.com/search?q=" + encodeURI(obj.query)
};

//Add the action for a command. Takes in a string array, a description and a function
cmd.addAction(["query"], "search {query} in google", implementSearchInGoogle);

//Start floodlight. It will start listening
fl.run();
```

## Multiple Commands - Add Social media search `shift`+`s`

The below code implements a social search using floodgate. It will listen for the `shift+s` key. It attaches two actions to one command.

```
let fl = new FloodLight();
let cmdSocial = fl.addCommand("s", "Search user name in social media");

//Adding twitter
let implementSearchTwitter = function(obj) {
	location.href = "https://twitter.com/" + encodeURI(obj.query)
};
cmdSocial.addAction(["query"], "search {query} in twitter", implementSearchTwitter);

//Adding facebook
let implementSearchFB = function(obj) {
	location.href = "https://www.facebook.com/" + encodeURI(obj.query)
};
cmdSocial.addAction(["query"], "search {query} in facebook", implementSearchFB);
//Start floodlight. It will start listening
fl.run();
```
## Multiple Params, Multiple Commands - Add, Subtract, Multiply two or three numbers `cmd`+`x` or `ctrl`+`x`

The below code implements arithmetic operation. It will listen for the `ctrl+x` key. It accepts more than one param.

```
let fl = new FloodLight();
let cmdCal = fl.addCommand("ctrl+x", "Provide comma separated numbers");

//Add 2 numbers
let add = function(obj) {
	alert(Number(obj.num1) + Number(obj.num2))
};
cmdCal.addAction(["num1", "num2"], "{num1} + {num2}", add);

//Subtract 2 numbers
let sub = function(obj) {
	alert(Number(obj.num1) - Number(obj.num2))
};
cmdCal.addAction(["num1", "num2"], "{num1} - {num2}", sub);

//Multiply 3 numbers
let mul = function(obj) {
	alert(Number(obj.num1) * Number(obj.num2) * Number(obj.num3))
};
cmdCal.addAction(["num1", "num2", "num3"], "{num1} x {num2} x {num3}", mul);
fl.run();
```
## Customizations

Floodlightjs gives you control over how the UI elements look. You can pass a class for advanced handling or use simple colors.
#### Separator
```
let config = {
    paramSeparator: " " //search box will break multiple inputs using space. Default is ','
}
let fl = new FloodLight(config);
```
#### Simple theme set
By default it will autodetect browser theme 
```
let config = {
    theme: "dark" //or light
}
let fl = new FloodLight(config);
```
#### Simple Colors light or dark theme
```
let config = {
	theme: {
		dark:{ //light or dark
			primary: "#111",
			secondary: "#231e24"
		}
	}
}
let fl = new FloodLight(config);
```
#### Add your class
```
let config = {
	cssClassPrefix: "fooclass"
}	

//It will add this prefix in all the UI elements
let fl = new FloodLight(config);
```
#### Add your CSS
```
//Once added you can handle CSS like this
.fooclass-wrapper{
	/*Main Overlay Component*/
}
.fooclass-search{
	/*Main Component*/
}
.fooclass-input{
	/*Search Component*/
}
.fooclass-dropdown{
	/*Dropdown Component*/
}
.fooclass-item{
	/*Items Component*/
}
```








