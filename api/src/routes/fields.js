const { Router } = require("express");
const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const Field = require("../models/Field");

const GetFieldByID = async (id) => {
    return Field.findById(id);
};

module.exports = {
    GetFieldByID,
    router,
};
