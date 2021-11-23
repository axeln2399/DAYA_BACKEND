const app = require("../app");
const request = require("supertest");
const { sequelize, Sequelize } = require("../models");
// const db = require("../models/index");

beforeAll((done) => {
    done();
});

afterAll((done) => {
    done();
});

describe("Post /teller", function () {
    test.only("Post Teller", (done) => {
        request(app)
            .post("/teller")
            .send({
                id: "132456",
                name: "Rexus"
            })
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                }))
                console.log(response.body);
                done();
            });
    });

    test.only("Get Teller", (done) => {
        request(app)
            .get("/teller")
            .expect(200)
            .then((response) => {
                console.log(response.body);
                done();
            });
    });
});
