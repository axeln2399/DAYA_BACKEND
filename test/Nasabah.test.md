const app = require("../app");
const request = require("supertest");
const db = require("../models/index");
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

beforeAll((done) => {
    // doingStart();
    done();
});

afterAll((done) => {
    done();
});

describe("Post & Get Nasabah", function () {
    let nasabah = {
        id: "999152",
        name: "Farhan Azulmy",
        no_telp: "085261507781",
        tenor: "4",
        loan: "1500000",
        crm_id: "927890"
    };
    test.only("POST Nasabah", (done) => {
        request(app)
            .post("/nasabah")
            .send(nasabah)
            .set("Authorization", token)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    installment: expect.any(String),
                    no_telp: expect.any(String),
                    loan: expect.any(String),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                }))
                // console.log(response.body);
                done();
            });
    });

    test.only("Get Nasabah", (done) => {
        request(app)
            .get("/nasabah")
            .set("Authorization", token)
            .expect(201)
            .then((response) => {
                console.log(response.body);
                done();
            });
    });

    test.only("Get Nasabah By Id", (done) => {
        request(app)
            .get("/nasabah/999100")
            .set("Authorization", token)
            .expect(201)
            .then((response) => {
                console.log(response.body);
                done();
            });
    });

    test.only("Get Nasabah By Id CustomerRoutineMeetup", (done) => {
        request(app)
            .get("/nasabah/list/927890")
            .set("Authorization", token)
            .expect(201)
            .then((response) => {
                console.log(response.body);
                done();
            });
    });

    let detail_PaymentNasabah = {
        date: "23/11/2021",
        count_tenor: "1",
        type: "Payment",
        nominal: "812500",
        nasabah_id: "999100"
    };
    test.only("POST Detail Payment Nasabah", (done) => {
        request(app)
            .post("/nasabah/detail/payment")
            .send(detail_PaymentNasabah)
            .set("Authorization", token)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(expect.objectContaining({
                    id: expect.any(Number),
                    date: expect.any(String),
                    count_tenor: expect.any(String),
                    type: expect.any(String),
                    nominal: expect.any(String),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    nasabah_id: expect.any(String),
                }))
                // console.log(response.body);
                done();
            });

    });

    let detail_LoanNasabah = {
        date: "23/11/2021",
        type: "Loan",
        nasabah_id: "999150",
        loan: "7500000",
        tenor: "10"
    };
    test.only("POST Detail Loan Nasabah", (done) => {
        request(app)
            .post("/nasabah/detail/loan")
            .send(detail_LoanNasabah)
            .set("Authorization", token)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(expect.objectContaining({
                    id: expect.any(Number),
                    date: expect.any(String),
                    count_tenor: expect.any(String),
                    type: expect.any(String),
                    nominal: expect.any(String),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    nasabah_id: expect.any(String),
                }))
                // console.log(response.body);
                done();
            });

    });

    test.only("Get Detail Nasabah By Id ", (done) => {
        request(app)
            .get("/nasabah/list/999100")
            .set("Authorization", token)
            .expect(201)
            .then((response) => {
                console.log(response.body);
                done();
            });
    });

})