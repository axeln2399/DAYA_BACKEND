const { raw } = require("express");
const db = require("../models/index");
const CustomerRoutineMeetup = db.CustomerRoutineMeetup;
const DetailCustomerRoutineMeetup = db.DetailCustomerRoutineMeetup;
const DetailNasabah = db.DetailNasabah;
const Nasabah = db.Nasabah;
const usingQuery = db.usingQuery;
const Op = db.Sequelize.Op;

function setBodyCRM(body) {
    return {
        id: body.id,
        name: body.name,
        address: body.regiaddresson,
        co_id: body.co_id,
    };
}

async function setDetailBodyCRM(body) {
    let hasilDate = "";
    if (!body.payment) {
        body.payment = "0";
    }
    if (!body.loan) {
        body.loan = "0";
    }

    return {
        date: body.date,
        payment: body.payment,
        loan: body.loan,
        status: body.status,
        crm_id: body.crm_id,
    };
}

exports.findCRMByIdCo = (req, res) => {
    let result = {};
    CustomerRoutineMeetup.findAll({
        where: {
            co_id: req.params.idCO,
        },
        raw: true,
    })
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((err) => {
            result.status = "gagal";
            result.message = err.message;
            res.status(500).send(result);
        });
};

exports.createCRMDetail = async (req, res, next) => {
    let result = {};
    let flag = false;
    let status = "";
    await CustomerRoutineMeetup.findAll({
        where: {
            id: req.params.idCRM,
        },
        raw: true,
    })
        .then((response) => {
            if (response.length < 1) {
                result.status = "gagal";
                result.message = "Data Not Found";
            } else {
                req.body.crm_id = req.params.idCRM;
                flag = true;
            }
        })
        .catch((err) => {
            result.status = "gagal";
            result.message = err.message;
        });

    if (!flag) {
        res.status(404).send(result);
    } else {
        let bodyDCRM = await setDetailBodyCRM(req.body);

        await DetailCustomerRoutineMeetup.findAll({
            where: {
                crm_id: bodyDCRM.crm_id,
                status: "Process",
            },
        })
            .then((response) => {
                status = response.length;
                if (status > 0) {
                    result.status = "gagal";
                    result.message = "Meetup Sebelumnya Belum di Selesaikan!";
                }
            })
            .catch((err) => {
                result.status = "gagal";
                result.message = err.message;
            });

        if (status > 0) {
            res.status(400).send(result);
        } else {
            DetailCustomerRoutineMeetup.create(bodyDCRM)
                .then((response) => {
                    res.status(201).send(response);
                })
                .catch((err) => {
                    result.status = "gagal";
                    result.message = err.message;
                    res.status(500).send(result);
                });
        }
    }
};

exports.endCRMDetail = async (req, res, next) => {
    let result = {};
    let targetTgl = "";
    let id = req.params.idCRM;
    let flag = false;
    await DetailCustomerRoutineMeetup.findAll({
        where: {
            crm_id: id,
            status: "Process",
        },
        order: [["updatedAt", "DESC"]],
        attributes: ["date", "id"],
        limit: 1,
        raw: true,
    })
        .then((response) => {
            if (response.length < 1) {
                result.status = "gagal";
                result.message = "Data Not Found";
            } else {
                targetTgl = response[0].date;
                idDCRM = response[0].id;
                flag = true;
            }
        })
        .catch((err) => {
            console.log(err);
            result.status = "gagal";
            result.message = err.message;
        });

    if (!flag) {
        res.status(404).send(result);
    } else {
        let loan = 0;
        let payment = 0;

        await Nasabah.findAll({
            where: {
                crm_id: id,
            },
            include: [
                {
                    model: DetailNasabah,
                    required: true,
                    where: {
                        date: targetTgl,
                    },
                    attributes: ["type", "nominal"],
                },
            ],
            raw: true,
        })
            .then((response) => {
                for (const datas of response) {
                    if (datas["detailnasabahs.type"] === "Loan") {
                        loan += parseInt(datas["detailnasabahs.nominal"]);
                    } else if (datas["detailnasabahs.type"] === "Payment") {
                        payment += parseInt(datas["detailnasabahs.nominal"]);
                    }
                }
                result.status = "sukses";
                result.message = "Berhasil Mendapatkan Summary";
                result.payment = payment;
                result.loan = loan;
                result.date = targetTgl;
                result.crm_id = id;
                result.detail = response;
                res.status(200).send(result);
            })
            .catch((err) => {
                result.status = "gagal";
                result.message = err.message;
                res.status(500).send(result);
            });
    }
};

exports.updateCRMDetail = async (req, res, next) => {
    let result = {};
    let id = req.params.idCRM;
    let flag = false;
    let targetId = "";

    await DetailCustomerRoutineMeetup.findAll({
        where: {
            crm_id: id,
            date: req.body.date,
            status: "Process",
        },
        limit: 1,
        raw: true,
    })
        .then((response) => {
            if (response.length < 1) {
                result.status = "gagal";
                result.message = "Data Not Found";
            } else {
                req.body.crm_id = id;
                targetId = response[0].id;
                flag = true;
            }
        })
        .catch((err) => {
            result.status = "gagal";
            result.message = err.message;
        });

    if (!flag) {
        res.status(404).send(result);
    } else {
        let bodyDCRM = await setDetailBodyCRM(req.body);
        DetailCustomerRoutineMeetup.update(bodyDCRM, {
            where: {
                id: targetId,
            },
        })
            .then(async (response) => {
                if (response < 1) {
                    result.status = "gagal";
                    result.message = "Data Not Found";
                    res.status(404).send(result);
                } else {
                    result.status = "sukses";
                    result.message = "Berhasil Update Status!";
                    result.data = await DetailCustomerRoutineMeetup.findOne({
                        where: {
                            id: targetId,
                        },
                    });
                    res.status(200).send(result);
                }
            })
            .catch((err) => {
                result.status = "gagal";
                result.message = err.message;
                res.status(500).send(result);
            });
    }
};

exports.historyCRMDetail = (req, res, next) => {
    let result = {};
    let id = req.params.idCRM;
    DetailCustomerRoutineMeetup.findAll({
        where: {
            crm_id: id,
        },
        order: [["updatedAt", "DESC"]],
        raw: true,
    })
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((err) => {
            result.status = "gagal";
            result.message = err.message;
            res.status(500).send(result);
        });
};
