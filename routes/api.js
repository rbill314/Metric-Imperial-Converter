'use strict';

let expect = require('chai').expect;
let ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('api/convert').get((req, res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) {
      res.send("Invalid Number & Unit")
    } else if (!initNum) {
      res.send("Invalid Num")
    } else if (!initUnit) {
      res.send("Invalid Unit")
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json(toString)
  });
};