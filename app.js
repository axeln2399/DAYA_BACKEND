require("dotenv").config();
const express = require("express");
const app = express();
// const mysql = require("mysql2");
const cors = require("cors");
const db = require("./models/index");

const routerTeller = require("./routers/TellerRouter");
const routerCommunityOfficer = require("./routers/CommunityOfficerRouter");
const routerCustomerRoutineMeetup = require("./routers/CustomerRoutineMeetupRouter");
const routerNasabah = require("./routers/NasabahRouter");
const routerLogin = require("./routers/LoginRouter");
const routerDump = require("./routers/DataDump");

const { isLogin } = require("./middlewares/auth");
//if change some table
// db.sequelize.sync({ force: true }); //kl pake force nanti tiap nge run bakal ngereset DB schema
//if not change some table
db.sequelize.sync();

// connection.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/data_dump", routerDump);
app.use("/login", routerLogin);
app.use("/teller", routerTeller);
app.use(isLogin);
app.use("/communityOfficer", routerCommunityOfficer);
app.use("/customerRoutineMeetup", routerCustomerRoutineMeetup);
app.use("/nasabah", routerNasabah);

module.exports = app;
