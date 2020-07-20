//jshint esversion:6

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");


mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title for your article"]
  },

  content: String
});
const Article = mongoose.model("Article", articlesSchema);


app.get("/", function (req,res){
  Article.find({}, function (err, articles){
    if(err) console.log(err);
    else{

      if(articles !== undefined && articles.length !== 0)
        articles.forEach(article => {
          console.log(article.title);
        });

      else
        console.log("empty");
    }
  });

  res.render("index");
});




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started successfully");
});