const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");
const {
    text
} = require("body-parser");

chai.use(chaiHttp);

suite("Functional Tests", function () {
    suite("Routing Tests", function () {
        suite("GET /api/convert => conversion object", function () {
            test("Convert 10L (valid input)", function (done) {
                chai
                    .request(server)
                    .get("/api/convert")
                    .query({
                        input: "10L"
                    })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 10);
                        assert.equal(res.body.initUnit, "L");
                        assert.approximately(res.body.returnNum, 2.64172, 0.1);
                        assert.equal(res.body.returnUnit, "gal");
                        done();
                    });
            });

            test('Convert 32g (invalid input unit)', function (done) {
                chai.request(server)
                    .get('/api/convert')
                    .query({
                        input: '32g'
                    })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.strictEqual(res.body.initNum);
                        assert.isUndefined(res.body.initUnit);
                        assert.strictEqual(res.body.returnNum);
                        assert.isUndefined(res.body.returnUnit);
                        assert.isString(res.text, 'invalid unit')
                        done();
                    });
            });

            test('Convert 3/7.2/4kg (invalid number)', function (done) {
                chai.request(server)
                    .get('/api/convert')
                    .query({
                        input: '3/7.2/4kg'
                    })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.isNotNumber(res.body.initNum);
                        assert.strictEqual(res.body.initUnit);
                        assert.isNotNumber(res.body.returnNum);
                        assert.strictEqual(res.body.returnUnit);
                        assert.isString(res.text, 'invalid number')
                        done();
                    });
            });

            test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function (done) {
                chai.request(server)
                    .get('/api/convert')
                    .query({
                        input: '3/7.2/4kilomegagram'
                    })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.isNotNumber(res.body.initNum);
                        assert.isUndefined(res.body.initUnit);
                        assert.isNotNumber(res.body.returnNum);
                        assert.isUndefined(res.body.returnUnit);
                        assert.isString(res.text, 'invalid number and unit')
                        done();
                    });
            });

            test("Convert kg (no number)", function (done) {
                chai
                    .request(server)
                    .get("/api/convert")
                    .query({
                        input: "kg"
                    })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 1);
                        assert.equal(res.body.initUnit, "kg");
                        assert.approximately(res.body.returnNum, 2.20462, 0.1);
                        assert.equal(res.body.returnUnit, "lbs");
                        done();
                    });
            });
        });
    });
});