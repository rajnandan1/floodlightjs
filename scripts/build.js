const fs = require("fs");
const { version } = require("../package.json");
console.log("Building " + version)
var compressor = require("node-minify");
fs.copyFile("./src/floodlight.js", "./es6/floodlight.js", (err) => {
    if (err) throw err;
    console.log("es6 created");
});

var logStream = fs.createWriteStream("./es6/floodlight.js", { flags: "a" });
// use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
logStream.end("export default function(opt){return new FloodLight(opt);}");


compressor.minify({
    compressor: "gcc",
    input: "./src/floodlight.js",
    output: "./dist/floodlight.min.js",
    callback: function (err, min) {
		if(err){
			console.error(err)
		} else {
			console.log("Minified")
		}
	},
});

fs.readFile('./README.md', "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
    var result = data.replace(/floodlightjs@(\d+\.)?(\d+\.)?(\*|\d+)/g, "floodlightjs@" + version);

    fs.writeFile("./README.md", result, "utf8", function (err) {
        if (err) return console.log(err);
    });
});
fs.readFile("./index.html", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
    var result = data.replace(/floodlightjs@(\d+\.)?(\d+\.)?(\*|\d+)/g, "floodlightjs@" + version);

    fs.writeFile("./index.html", result, "utf8", function (err) {
        if (err) return console.log(err);
    });
});
console.log("Build successful")