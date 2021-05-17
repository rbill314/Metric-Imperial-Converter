class ConvertHandler {
  constructor() {
    this.getNum = (input) => {
      var numRegex = /[\W\d]+/g;
      var num = input.match(numRegex);
      var result;
      if (!num) {
        var unit = this.getUnit(input);
        if (unit === "invalid unit") {
          return;
        }
        if (unit === "invalid unit") {
          return "invalid unit";
        } else {
          result = "1";
        }
      }

      if (num) {
        result = num[0];
        if (result == "0" || result.includes("-") || result === "Infinity") {
          return "invalid number";
        }
        if (result.includes("/")) {
          let values = result.split("/");
          if (values.length != 2) {
            return "invalid number";
          }
          values[0] = parseFloat(values[0]);
          values[1] = parseFloat(values[1]);
          result = parseFloat(values[0] / values[1]);
        }
        if (isNaN(result)) {
          return "invalid number";
        }
      }
      return result * 1;
    };

    this.getUnit = (input) => {
      var unitRegex = /[a-z]+$/i;
      var unit = input.match(unitRegex);
      if (!unit) {
        return "invalid unit";
      }
      if (unit) {
        var result = unit[0].toLowerCase();
        let validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
        if (!validUnits.includes(result)) {
          return "invalid unit";
        }
        if (result === "l") {
          result = "L";
        }
        return result;
      }
    };

    this.getReturnUnit = (initUnit) => {
      switch (initUnit) {
        case "gal":
          return "L";
        case "L":
          return "gal";
        case "lbs":
          return "kg";
        case "kg":
          return "lbs";
        case "mi":
          return "km";
        case "km":
          return "mi";
        default:
          return "invalid unit";
      }
    };

    this.spellOutUnit = (unit) => {
      switch (unit) {
        case "mi":
          return "miles";
        case "km":
          return "kilometers";
        case "lbs":
          return "pounds";
        case "kg":
          return "kilograms";
        case "gal":
          return "gallons";
        case "l":
          return "liters";
        default:
          return "invalid unit";
      }
    };

    this.convert = (initNum, initUnit) => {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;

      const roundToFiveDecimals = n => Math.round(n * 100000) / 100000;

      switch (initUnit) {
        case "gal":
          return roundToFiveDecimals(initNum * galToL);
        case "L":
          return roundToFiveDecimals(initNum / galToL);
        case "lbs":
          return roundToFiveDecimals(initNum * lbsToKg);
        case "kg":
          return roundToFiveDecimals(initNum / lbsToKg);
        case "mi":
          return roundToFiveDecimals(initNum * miToKm);
        case "km":
          return roundToFiveDecimals(initNum / miToKm);
        default:
          return "invalid unit";
      }
    };

    this.getString = (initNum, initUnit, returnNum, returnUnit) => {
      return `${initNum} ${this.spellOutUnit(
        initUnit
      )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    };
  }
}

module.exports = ConvertHandler;