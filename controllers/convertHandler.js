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
      return undefined;
    }

    return result;
  };

  this.getUnit = function (input) {
    var result;

    let inputRegex = /[a-z]+|[^a-z]+/gi

    result = input.match(inputRegex)[1]

    if (!result) {
      result = input.match(inputRegex)[0]
    }

    let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG']

    if (!validUnits.includes(result)) {
      return 'invalid unit'
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let unit = initUnit.toLowercase();

    switch (unit) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function (unit) {
    var result;

    switch (unit) {
      case 'gal':
      case 'GAL':
        result = 'gallon(s)';
        break;
      case 'l':
      case 'L':
        result = 'liter(s)';
        break;
      case 'lbs':
      case 'LBs':
        result = 'pound(s)';
        break;
      case 'kg':
      case 'KG':
        result = 'kilogram(s)';
        break;
      case 'mi':
      case 'MI':
        result = 'mile(s)';
        break;
      case 'km':
      case 'KM':
        result = 'kilometer(s)';
        break;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowercase();
    let result;

    switch (unit) {
      case "gal":
        result = initNum * galToL;
      case "lbs":
        result = initNum * lbsToKg;
      case "mi":
        result = initNum * miToKm;
      case "L":
        result = initNum / galToL;
      case "kg":
        result = initNum / lbsToKg;
      case "km":
        result = initNum / miToKm;
      default:
        result = undefined;
    };
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  }
}

module.exports = ConvertHandler;