const { Router } = require("express");
const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();

// Dummy data testing for masterbox
router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  res.send("OK");
  const data = JSON.stringify(req.body);
  const fs = require("fs");
  const path = require("path");
  fs.writeFileSync(path.resolve(__dirname, "../storage/last_data.json"), data);
});

module.exports = router;