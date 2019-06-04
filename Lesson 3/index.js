// console.log("Hello Loreta")
var os = require("os");
var message = "The platform is ";

function main(){
   console.log(message + os.platform());
}
main();

var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hello world");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
