const app = require("../app");
const request = require("supertest");
const db = require("../models/index");
const CommunityOfficer = db.CommunityOfficer;
const Teller = db.Teller;
var jwt = require("jsonwebtoken");
const secretKey = process.env.secretKeyToken;

let token = jwt.sign(
    {
        id: "567896",
        nik: "758758",
        nama: "Bambang Pamungkas",
    },
    secretKey
);

async function doingStart() {
    db.sequelize.sync();
    // CommunityOfficer.create({
    // id: "567896",
    // name: "Bambang Pamungkas",
    // region: "Bekasi Selatan",
    // nik: "758758",
    // password: "password",
    // teller_id: "987654",
    // }).then((data) => {
    // console.log(data);
    // let dataToken = {
    // id: response.id,
    // nik: response.nik,
    // nama: response.nama,
    // };
    // token = jwt.sign(dataToken, secretKey);
    // console.log(token);
    // });
}

beforeAll((done) => {
    doingStart();
    done();
});

afterAll((done) => {
    done();
});

// console.log(token);

describe("Post & Get CommunityOfficer", function () {

    test.only("Get CommunityOfficer", (done) => {
        request(app)
            .get("/communityOfficer/567896")
            .set("Authorization", token)
            .expect(200)
            .then((response) => {
                console.log(response.body);
                done();
            });
    });

    let co = {
        id: "123456",
        name: "Pandu",
        region: "Bekasi Selatan",
        nik: "758765",
        password: "password",
        teller_id: "987654",
    };
    test.only("POST CommunityOfficer", (done) => {
        request(app)
            .post("/communityOfficer")
            .send(co)
            .set("Authorization", token)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    region: expect.any(String),
                    nik: expect.any(String),
                    password: expect.any(String),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    teller_id: expect.any(String)
                }))
                // console.log(response.body);
                done();
            });

    });

});
