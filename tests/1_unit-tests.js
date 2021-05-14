const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite("Function convertHandler.getNum(input)", function () {
        test("Whole number input", function (done) {
            const input = "32L";
            assert.strictEqual(convertHandler.getNum(input), 32);
            done();
        });

        test("Decimal Input", function (done) {

        })

        test("Fractional Input", function (done) {

        })

        test("Fractional Input w/ Decimal", function (done) {

        })

        test("Invalid Input (double fraction)", function (done) {

        })

        test("No Numerical Input", function (done) {

        })
    })

    suite("Function convertHandler.getUnit(input)", function () {
        test("For Each Valid Unit Inputs", function (done) {

        })

        test("Unknown Unit Input", function (done) {

        })
    })

    suite("Function convertHandler.getReturnUnit(initUnit)", function () {
        test("For Each Valid Unit Inputs", function (done) {

        })
    })

    suite("Function convertHandler.spellOutUnit(unit)", function () {
        test("For Each Valid Unit Inputs", function (done) {

        })
    })

    suite("Function convertHandler.convert(num, unit)", function () {
        test("Gal to L", function (done) {

        })

        test("L to Gal", function (done) {

        })

        test("Mi to Km", function (done) {

        })

        test("Km to Mi", function (done) {

        })

        test("Lbs to Kg", function (done) {

        })

        test("Kg to Lbs", function (done) {

        })
    })
})