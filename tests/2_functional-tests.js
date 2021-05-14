const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

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
                        assert.strictEqual(res.status, 200);
                        assert.strictEqual(res.body.initNum, 10);
                        assert.strictEqual(res.body.initUnit, "L");
                        assert.approximately(res.body.returnNum, 2.64172, 0.1);
                        assert.strictEqual(res.body.returnUnit, "gal");
                        done();
                    });
            });

            test("Convert 32g (invalid input unit)", function (done) {

            })

            test("Convert 3/7.2/4kg (invalid number)", function (done) {

            })

            test("Convert 3/7.2/4kilomegagram (invalid number and unit)", function (done) {

            })

            test("Convert kg (no number)", function (done) {

            })
        })
    })
})