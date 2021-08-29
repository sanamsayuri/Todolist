const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static("public"));

var items = ['cooking'];
var workItems=[];
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  var today = new Date();

  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle: day,
    newListItems: items
  });


});

app.post("/", function(req, res) {

  var Task = req.body.newTask;
  if(req.body.list==="work list"){
    workItems.push(Task);
    res.redirect("/work");
  }else{
    items.push(Task);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {

  res.render("list", {
    listTitle: "work list",
    newListItems: workItems
  });
});

app.post("/work",function(req,res){

  var item= req.body.newItem;
  workItems.push(item);
  res.redirect("/");
})
app.get("/about",function(req,res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("server has started on port 3000");
});
