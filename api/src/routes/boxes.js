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

router.get("/", async (req, res) => {
      res.send("test");
  return "hehe";
});

module.exports = router;
