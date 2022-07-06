const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("listening on port 3000");
});

MongoClient.connect(
  "mongodb+srv://toniwilliams:Mindless1@cluster0.zjlzl.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("new-star-wars");

    const quotesCollection = db.collection("quotes");

    app.get("/", (req, res) => {
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
        })
        .catch(error => console.error(error));
    });

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });
  
   app.get('/market', (req, res) => {
      res.render('market.ejs');
    });

     app.get('/home', (req, res) => {
      res.render('home.ejs');
    });
  
   app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted Darth Vadar\'s quote')
        })
        .catch(error => console.error(error))
    })

  
  app.put("/quotes", (req, res) => {
  quotesCollection.findOneAndUpdate(
      { name: "Yoda" },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote,
        },
      },
      {
        upsert: true,
      }
    )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.error(error));
});

  
app.put("/quotes", (req, res) => {
  console.log(req.body);
});
  
    app.post("/quotes", (req, res) => {
      console.log(req.body);
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log("this is result", result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));






app.use(express.static("public"));
app.use(bodyParser.json());
