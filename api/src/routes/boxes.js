const { Router } = require("express");
const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const Box = require("../models/Box");
const FieldRoute = require("./fields");

router.post("/", async (req, res) => {
    try {
        req.body.data.fieldID = await FieldRoute.GetFieldByID(
            req.body.data.fieldID
        );
        const box = await Box.create(req.body);
        res.status(201).send(box);
        return box;
    } catch (err) {
        res.send("Error");
    }
});

router.get("/", async (req, res) => {
    try {
        const boxes = await Box.find().populate("fieldID");
        if (boxes) {
            res.send(boxes);
            return boxes;
        }
    } catch (err) {
        res.send("Error");
    }
});

/*
router.get("/latest", async (req, res) => {
    const boxes = Box.field;
});


router.patch("/update/:Time/:boxID/:fieldcount", async (req, res) => {
    const box = await Box.findById(req.params.boxID);
    box.fields.forEach((field) => {
        if ((field.fieldCount = req.params.fieldcount)) {
          field.data.forEach(time => {
            if()
          });
        }
    });
});
*/

router.get("/:boxname", async (req, res) => {
    try {
        const box = await Box.find({ boxName: req.params.boxname });
        res.send(box.fields);
        return box.fields;
    } catch (err) {
        res.send("Error");
    }
});

router.get("/fields/:fieldcount/:fieldID", async (req, res) => {
    try {
        const boxes = await Box.aggragate({
            $group: {
                _id: req.params.fieldID,
                raw: fields[{ fieldCount: req.params.fieldCount }].data.raw,
            },
        });
    } catch (err) {
        res.send("Error");
    }
});

module.exports = router;

/** 
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
    fs.writeFileSync(
        path.resolve(__dirname, "../storage/last_data.json"),
        data
    );
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

*/
