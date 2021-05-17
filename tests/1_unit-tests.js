const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  suite("Function convertHandler.getNum(input)", () => {
    test("Whole number input", (done) => {
      const input = "32L";
      assert.strictEqual(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", (done) => {
      const input = "32L";
      assert.strictEqual(convertHandler.getNum(input), 32.0);
      done();
    });

    test("Fractional Input", (done) => {
      const input = "1/32L";
      assert.strictEqual(convertHandler.getNum(input), 1 / 32);
      done();
    });

    test("Fractional Input w/ Decimal", (done) => {
      const input = "1.2/32L";
      assert.strictEqual(convertHandler.getNum(input), 1.2 / 32);
      done();
    });

    test("Invalid Input (double fraction)", (done) => {
      const input = "1/32L";
      assert.strictEqual(convertHandler.getNum(input), 1 / 1 / 32);
      done();
    });

    test("No Numerical Input", (done) => {
      const input = "L";
      assert.strictEqual(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", () => {
    test("For Each Valid Unit Inputs", done => {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG"
      ];
      input.forEach((ele) => {
        assert.equal(convertHandler.getUnit(ele), ele.toLowerCase());
        done();
      });
    });

    test("Unknown Unit Input", (done) => {
      const input = "xyz";
      assert.isOk(convertHandler.getUnit(input));
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      const input = ["gal", "L", "mi", "km", "lbs", "kg"];
      const expect = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      var input = ["gal", "l", "mi", "km", "lbs", "kg"];
      var expect = [
        "gallons",
        "litres",
        "miles",
        "kilometers",
        "pounds",
        "kilograms"
      ];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
        done();
      });
    });
  });

  suite("Function convertHandler.convert(num, unit)", () => {
    test("Gal to L", (done) => {
      let input = [10, "gal"];
      let expected = 37.8541;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("L to Gal", (done) => {
      let input = [10, "L"];
      let expected = 2.6417;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Mi to Km", (done) => {
      let input = [10, "mi"];
      let expected = 16.0934;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Km to Mi", (done) => {
      let input = [10, "km"];
      let expected = 6.2137;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Lbs to Kg", (done) => {
      let input = [10, "lbs"];
      let expected = 4.53592;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Kg to Lbs", (done) => {
      let input = [10, "kg"];
      let expected = 22.04624;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
  });
});