var express = require("express");
var cors = require('cors')

var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var USERS_COLLECTION = "users";

var app = express();
app.use(cors());
app.use(bodyParser.json());


var db;


mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Amtica_Assignment_Prachi", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }


  db = client.db();
  console.log("Database connection ready");


  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    var add = server.address();
    console.log("App now running on port", port);
  });
});


function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(500).json({ "error": message });
}


app.post("/api/users", function (req, res) {
  var newUser = req.body;
  newUser.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(USERS_COLLECTION).insertOne(newUser, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new user.");
      } else {
        res.status(201).json(doc.ops[0]);
        console.log("Saved")
      }
    });
  }
});


app.get("/api/users/:id", function (req, res) {
  db.collection(USERS_COLLECTION).findOne({ _id: req.params.id }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.get("/api/users", function (req, res) {
  db.collection(USERS_COLLECTION).findOne({ _id: req.query.id,password:req.query.pass}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/users/:id", function (req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(USERS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/users/:id", function (req, res) {
  db.collection(USERS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete user");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});