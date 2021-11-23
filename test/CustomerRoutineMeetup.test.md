const app = require("../app");
const request = require("supertest");
const db = require("../models/index");
// const CommunityOfficer = db.CommunityOfficer;
// const Teller = db.Teller;
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

describe("Post & Get CustomerRoutineMeetup", function () {

    let crm = {
        date: "23/11/2021",
        status: "Process"
    };
    test.only("POST CustomerRoutineMeetup", (done) => {
        request(app)
            .post("/customerRoutineMeetup/detail/create/927890")
            .send(crm)
            .set("Authorization", token)
            .expect(201)
            .then((response) => {
                console.log(response.body);
                done();
            });

    });

    test.only("Get CustomerRoutineMeetup", (done) => {
        request(app)
            .get("/customerRoutineMeetup/567896")
            .set("Authorization", token)
            .expect(200)
            .then((response) => {
                console.log(response.body);
                done();
            });
    });



    test.only("Get End CustomerRoutineMeetup Detail", (done) => {
        request(app)
            .get("/customerRoutineMeetup/detail/endsummary/927890")
            .set("Authorization", token)
            .expect(200)
            .then((response) => {
                console.log(response.body);
                done();
            });
    });


    test.only("Get History CustomerRoutineMeetup", (done) => {
        request(app)
            .get("/customerRoutineMeetup/detail/history/927890")
            .set("Authorization", token)
            .expect(200)
            .then((response) => {
                console.log(response.body);
                done();
            });
    });

    let endcrm = {
        payment: "0",
        loan: "14728001",
        date: "23/11/2021",
        status: "Done"
    };
    test.only("PUT CustomerRoutineMeetup", (done) => {
        request(app)
            .put("/customerRoutineMeetup/detail/endsummary/927890")
            .send(endcrm)
            .set("Authorization", token)
            .expect(200)
            .then((response) => {
                console.log(response.body);
                done();
            });

    });

})