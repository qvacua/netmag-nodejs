var express = require("express");
var jsonParser = require("body-parser").json();

var app = express();
var server = app
    .get("/", (req, res) => res.json({msg: "Hello, World!"}))
    .post("/users", jsonParser, (req, res) => {
      if (req.body.username === "tae") {
        return res.status(409).json({error: "The Username " + req.body.username + " already exists."});
      }

      return res.status(201).json({"username": req.body.username}); // Let's pretend to have created a new user
    })
    .get("/users/:username", (req, res) => {
      if (req.params.username === "tae") {
        return res.status(200).json({username: "tae", displayName: "Tae Won"});
      }

      return res.status(404).end();
    })
    .use("/static", express.static(__dirname + "/public"))
    .listen(4000, () => console.log("Listening at http://localhost:%s", server.address().port));
