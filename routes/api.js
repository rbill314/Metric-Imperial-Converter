"use strict";

let expect = require("chai").expect;
let ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    var input = req.query.input;
    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var returnNum = convertHandler.convert(initNum, initUnit);
    var toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    if (initNum == "invalid number" && initUnit == "invalid unit") {
      res.json("invalid number and unit");
    } else if (initUnit == "invalid unit") {
      res.json("invalid unit");
    } else if (initNum == "invalid number") {
      res.json("invalid number");
    } else
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
  });
};