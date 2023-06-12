const { Router } = require("express");
const express = require("express");
const { restart } = require("nodemon");

const router = express.Router();
const Box = require("../models/Box");

router.post("/", async (req, res) => {
  console.log(req.body);

  /*
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    */

  const box = await Box.create(req.body);
  console.log(box);
  res.send(box);
  return box;

  //console.log(post);
});

// Dummy data testing for masterbox
router.get("/test", async (req, res) => {
  const fs = require("fs");
  const path = require("path");
  fs.readFile(
    path.resolve(__dirname, "../storage/last_data.json"),
    (err, data) => {
      if (err) res.send(err);
      else {
        let lastData = JSON.parse(data);
        res.send(lastData);
      }
    }
  );
  return "hehe";
});

router.post("/test", async (req, res) => {
  res.send("OK");
  const data = JSON.stringify(req.body);
  const fs = require("fs");
  const path = require("path");
  fs.writeFileSync(path.resolve(__dirname, "../storage/last_data.json"), data);
});

router.get("/", async (req, res) => {
  res.send("test");
  return "hehe";
});

// GET SPECIFIC POST BY ID
router.get("/:boxId", async (req, res) => {
  try {
    const box = await Box.findById(req.params.postId);
    res.json(box);
    //console.log(req.params.postId);
  } catch (err) {
    res.send("There is no such box");
  }
});

module.exports = router;
