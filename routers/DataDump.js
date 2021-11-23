const express = require("express");
const router = express.Router();
const db = require("../models/index");
const fs = require("fs");

const Teller = db.Teller;

const CommunityOfficer = db.CommunityOfficer;
const DetailCommunity = db.DetailCommunityOfficers;

const Nasabah = db.Nasabah;
const DetailNasabah = db.DetailNasabah;

const CustomerRoutineMeetup = db.CustomerRoutineMeetup;
const DetailCustomerRoutineMeetup = db.DetailCustomerRoutineMeetup;

const usingQuery = db.usingQuery;
const Op = db.Sequelize.Op;

router.delete("/", async (req, res, next) => {
    let result = {};
    result.status = "sukses";
    result.message = "DELETE ALL DATA ON DATABASE!";
    result.deleted = [];
    console.log("==================DELETE====================");

    //harus dari belakang & Yang ID ny tidak ada di table lain

    //part Detail Nasabah
    await DetailNasabah.destroy({
        where: {},
        restartIdentity: true,
        truncate: { cascade: true },
    })
        .then((response) => {
            var data = "DNasabah : " + response;
            result.deleted.push(data);
        })
        .catch((err) => {
            console.log(err.message);
        });

    //part Detail CRM
    await DetailCustomerRoutineMeetup.destroy({
        where: {},
        restartIdentity: true,
        truncate: { cascade: true },
    })
        .then((response) => {
            var data = "DCRM : " + response;
            result.deleted.push(data);
        })
        .catch((err) => {
            console.log(err.message);
        });

    //part Detail CO
    await DetailCommunity.destroy({
        where: {},
        restartIdentity: true,
        truncate: { cascade: true },
    })
        .then((response) => {
            var data = "DCO : " + response;
            result.deleted.push(data);
        })
        .catch((err) => {
            console.log(err.message);
        });

    //part Nasabah
    await Nasabah.destroy({
        where: {},
        restartIdentity: true,
        truncate: { cascade: true },
    })
        .then((response) => {
            var data = "Nasabah : " + response;
            result.deleted.push(data);
        })
        .catch((err) => {
            console.log(err.message);
        });

    //part CRM
    await CustomerRoutineMeetup.destroy({
        where: {},
        restartIdentity: true,
        truncate: { cascade: true },
    })
        .then((response) => {
            var data = "CRM : " + response;
            result.deleted.push(data);
        })
        .catch((err) => {
            console.log(err.message);
        });

    //part CO
    await CommunityOfficer.destroy({
        where: {},
        restartIdentity: true,
        truncate: { cascade: true },
    })
        .then((response) => {
            var data = "CO : " + response;
            result.deleted.push(data);
        })
        .catch((err) => {
            console.log(err.message);
        });

    await Teller.destroy({
        where: {},
        restartIdentity: true,
        truncate: { cascade: true },
    })
        .then((response) => {
            var data = "Teller : " + response;
            result.deleted.push(data);
        })
        .catch((err) => {
            console.log(err.message);
        });

    res.status(200).send(result);
});

router.post("/", async (req, res, next) => {
    let dataImport = {};
    let result = {};
    result.status = "sukses";
    result.message = "Berhasil Import Data";
    console.log("==================IMPORT====================");

    try {
        //deklarasi file yang mau di read
        let pathFolder = "\\..\\dataDumpPakeId\\";
        let pathTeller = pathFolder + "Teller_dump.json";
        let pathCommunityOfficer = pathFolder + "Co_dump.json";
        let pathCustomerRoutineMeetup = pathFolder + "Crm_dump.json";
        let pathNasabah = pathFolder + "Nasabah_dump.json";

        //read data dari file
        let rawTeller = fs.readFileSync(__dirname + pathTeller);
        let rawCommunityOfficer = fs.readFileSync(
            __dirname + pathCommunityOfficer
        );
        let rawCustomerRoutineMeetup = fs.readFileSync(
            __dirname + pathCustomerRoutineMeetup
        );
        let rawNasabah = fs.readFileSync(__dirname + pathNasabah);

        //parsing data ke JSON
        let dataTeller = JSON.parse(rawTeller);
        let dataCommunityOfficer = JSON.parse(rawCommunityOfficer);
        let dataCustomerRoutineMeetup = JSON.parse(rawCustomerRoutineMeetup);
        let dataNasabah = JSON.parse(rawNasabah);

        await Teller.create(dataTeller)
            .then((response) => {
                dataImport.TellerImported = "Added";
                console.log(dataImport);
            })
            .catch((err) => {
                console.log(err.message);
            });

        await CommunityOfficer.bulkCreate(dataCommunityOfficer)
            .then((response) => {
                dataImport.COImported = response.length;
                console.log(dataImport);
            })
            .catch((err) => {
                console.log(err.message);
            });

        await CustomerRoutineMeetup.bulkCreate(dataCustomerRoutineMeetup)
            .then((response) => {
                dataImport.CRMImported = response.length;
                console.log(dataImport);
            })
            .catch((err) => {
                console.log(err.message);
            });

        await Nasabah.bulkCreate(dataNasabah)
            .then((response) => {
                dataImport.NasabahImported = response.length;
                console.log(dataImport);
            })
            .catch((err) => {
                console.log(err.message);
            });

        result.imported = dataImport;
        res.status(201).send(result);
    } catch (e) {
        console.log(e.message);
    }
});

module.exports = router;
