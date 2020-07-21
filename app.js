//jshint esversion:6

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");


mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title for your article"]
  },

  content: String
});
const Article = mongoose.model("Article", articleSchema);


app.get("/articles", function (req,res){

  Article.find(function (err, articles){
    if(err) console.log(err);
    else{

      // if(articles !== undefined && articles.length !== 0)
      //   articles.forEach(article => {
      //     console.log(article);
      //   });

      // else
      //   console.log("empty");

      res.send(articles);
    }

    
  });

  // res.render("index");
  

});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started successfully");
});