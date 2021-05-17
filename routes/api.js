"use strict";

let expect = require("chai").expect;
let ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function(app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
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

    const answer = () => {
      if (
        !initNum ||
        (initNum === "invalid number" && returnUnit === "invalid unit")
      ) {
        return "invalid number and unit";
      } else if (!initNum || initNum === "invalid number") {
        return "invalid number";
      } else if (returnUnit === "invalid unit") {
        return "invalid unit";
      } else {
        return {
          initNum,
          initUnit,
          returnNum,
          returnNum,
          returnUnit,
          string: toString
        };
      }
    };

    res.json(answer());
  });
};
