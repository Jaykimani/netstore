
const express = require("express");


const app = express();

app.use(express.static('public'))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/products", function(req, res){
  res.sendFile(__dirname + "/products.html");
});
 
app.get("/single", function(req, res){
  res.sendFile(__dirname + "/single.html");
})

  


const port = process.env.PORT || 3000
app.listen( "3000" , function(){
  console.log("server running on port 3000!");
})


     
     