function splitter(input) {
  let number = input.match(/[.\d/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0]

  return [number[0], string];
}

function div(posFrac) {
  let nums = posFrac.split("/")
  if (nums.length > 2) {
    return false
  }
  return nums
}

function ConvertHandler() {

  this.getNum = function (input) {
    let result = splitter(input)[0];
    let nums = div(result);

    if (!nums) {
      return undefined;
    }

    let num1 = nums[0];
    let num2 = nums[1] || "1";

    result = parseFloat(num1) / parseFloat(num2);

    if (isNaN(num1) || isNaN(num2)) {
      return 'Invalid Get Num'
    }

    return result;
  };

  this.getUnit = function (input) {
    const re = /[A-Za-z]+/;
    let unit = re.exec(input);
    if (!unit) return null;
    unit = unit[0].toLowerCase();
    if (unit === 'l') unit = 'L';
    const possibleInputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    if (possibleInputs.indexOf(unit) === -1) return null;
    return unit;
  };

  this.getReturnUnit = function (initUnit) {

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
        return 'Invalid Return Unit';
    }
  };

  this.spellOutUnit = function (unit) {

    switch (unit) {
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      case 'gal':
        return 'gallons';
      case 'l':
        return 'liters';
      default:
        return 'Invalid Spell Out Unit';
    }
  };


  this.convert = function (initNum, initUnit) {
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
        return 'Invalid Convert'
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} 
     converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    };
  };
}

module.exports = ConvertHandler;