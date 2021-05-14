'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  api.router('api/convert').get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    if (!initNum && !initUnit) res.status(400).json('invalid number and unit');
    else if (!initNum) res.status(400).json('invalid number');
    else if (!initUnit) res.status(400).json('invalid unit');
    else {
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        toString
      });
    };
  });
};