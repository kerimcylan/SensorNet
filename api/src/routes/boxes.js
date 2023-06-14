const { Router } = require("express");
const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const Box = require("../models/Box");
const FieldRoute = require("./fields");
const slugify = require("slug");
const Field = require("../models/Field");
const ObjectId = require("mongoose").Types.ObjectId;

const GRAPH_LENGTH = 30;


async function updateRawData(id, field, timestamp, value) {

    box = await Box.updateOne(
    {
      _id: id,
      "fields.field": field,
    },
    {
      $push: {
        "fields.$.data.raw": {
          timestamp: timestamp,
          value: value,
        },
      },
    }
    );

    accepted = true;
    return accepted;
}



// insert data
router.post("/", async (req, res) => {
    const fields = await Field.find().select("_id");
    //req.body.

    for (key in req.body.data) {
        field = key;
        value = req.body.data[key];

        let box = await updateRawData(
          req.body.BoxID,
          field,
          req.body.Datetime,
          value
        );
    }
  
    res.send('OK');
});

router.post("/createbox", async (req, res) => {
  if (
    // Is name valid
    req.body.name &&
    typeof req.body.name == "string" &&
    // Is location valid
    req.body.location &&
    Array.isArray(req.body.location) &&
    req.body.location.length == 2 &&
    req.body.location[0] <= 1097 &&
    req.body.location[0] >= 0 &&
    req.body.location[1] <= 396 &&
    req.body.location[1] >= 0
  ) {
    let documentExists = await Box.exists({
      slug: slugify(req.body.name, "-"),
    });

    if (documentExists) {
      res.status(400).send("Name exists");
      return;
    }
    const box = await Box.create({
      name: req.body.name,
      location: req.body.location,
      slug: slugify(req.body.name, "-"),
    });
    res.status(201).send("OK");
    return;
  }

  res.status(400).send("Wrong data format");
});

router.post("/addfieldtobox", async (req, res) => {
  // Check body integrity
  if (
    req.body.slug &&
    typeof req.body.slug == "string" &&
    req.body.fieldId &&
    ObjectId.isValid(req.body.fieldId)
  ) {
    const field = await Field.findOne({ _id: req.body.fieldId }).exec();
    if (!field) {
      res.status(400).send("Field not found");
      return;
    }

    // Check if field already pushed
    box = await Box.updateOne(
      { slug: req.body.slug },
      { $push: { fields: { field: field } } }
    );

    // If box not found return error with message
    if (box.matchedCount == 0) {
      res.status(400).send("Box not found");
      return;
    }
    res.status(200).send("OK");
    return;
  }

  res.status(400).send("Wrong data format");
});

router.get("/", async (req, res) => {
  //try {

  const boxes = await Box.find(
    {},
    {
      "fields.data.raw": { $slice: -1 * GRAPH_LENGTH },
      'fields.data.1m': { $slice: -1 * GRAPH_LENGTH },
      'fields.data.5m': { $slice: -1 * GRAPH_LENGTH },
      "fields.data.30m": { $slice: -1 * GRAPH_LENGTH },
      "fields.data.1h": { $slice: -1 * GRAPH_LENGTH },
      "fields.data.4h": { $slice: -1 * GRAPH_LENGTH },
      "fields.data.12h": { $slice: -1 * GRAPH_LENGTH },
      "fields.data.1d": { $slice: -1 * GRAPH_LENGTH },
      "fields.data.1w": { $slice: -1 * GRAPH_LENGTH },
    }
  )
    .sort("name")
    .populate("fields.field");
  /*
  const boxes = await Box.aggregate([
    {
      $project: {
        fields: { data: { $sortArray: { input }, $raw: { $slice: -5 } } },
      },
    },
  ]);
            */
  if (boxes) {
    res.send(boxes);
    return boxes;
  }
  /*
  } catch (err) {
    res.status(500).send("Error");
  }
  */
});


router.get("/latest", async (req, res) => {
    const boxes = await Box.find(
      {},
      {
        "fields.data.raw": { $slice: -1 },
        "fields.data.1m": { $slice: -1 },
        "fields.data.5m": { $slice: -1 },
        "fields.data.30m": { $slice: -1 },
        "fields.data.1h": { $slice: -1 },
        "fields.data.4h": { $slice: -1 },
        "fields.data.12h": { $slice: -1 },
        "fields.data.1d": { $slice: -1 },
        "fields.data.1w": { $slice: -1 },
      }
    )
      .sort("name")
      .populate("fields.field");

  res.send(boxes);
});

/*
router.get("/:boxname", async (req, res) => {
  try {
    const box = await Box.find({ slug: req.params.boxname });
    res.send(box);
    //res.send(box.fields);
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




*/
module.exports = router;