const db = require("../models/index");
const Nasabah = db.Nasabah;
const DetailNasabah = db.DetailNasabah;
const usingQuery = db.usingQuery;
const Op = db.Sequelize.Op;

// get nasabah
exports.getNasabah = (req, res) => {
    Nasabah.findAll({ raw: true })
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(404).send({ message: "failed" });
        });
};

// get nasabah by id nya sendiri
exports.getNasabahById = (req, res) => {
    Nasabah.findAll({
        where: { id: req.params.id },
        raw: true,
    })
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(404).send(err, { message: "failed" });
        });
};

// get nasabah by id crm
exports.getNasabahByIdCRM = (req, res) => {
    Nasabah.findAll({
        where: {
            crm_id: req.params.id,
        },
        raw: true,
    })
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(404).send({ message: "failed" });
        });
};

//post nasabah
exports.createNasabah = (req, res) => {
    Nasabah.create(req.body)
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(404).send({ message: "failed" });
        });
};

//post detail nasabah payment buat di page paymentNasabah
exports.paymentNasabah = async (req, res) => {
    let tenor = "";
    await Nasabah.findAll({
        where: {
            id: req.body.nasabah_id,
        },
        limit: 1,
        raw: true,
    })
        .then((response) => {
            tenor = response[0].tenor; //5
            countTenor = req.body.count_tenor; //6

            if (countTenor < tenor && req.body.type === "Loan") {
                result.status = "gagal";
                result.message = "Pinjaman Belum Lunas!";
                throw {
                    status: 400,
                    json: result,
                };
            } else {
                if (countTenor > tenor && req.body.type === "Payment") {
                    result.status = "gagal";
                    result.message = "Pembayaran Telah Lunas!";
                    throw {
                        status: 400,
                        json: result,
                    };
                } else {
                    DetailNasabah.create(req.body)
                        .then((data) => {
                            res.status(201).send(data);
                        })
                        .catch((err) => {
                            res.status(500).send({ message: err.message });
                        });
                }
            }
        })
        .catch((err) => {
            if (err.json) {
                if (err.json.status === "gagal") {
                    res.status(err.status).send(err.json);
                } else {
                    res.status(500).send(err.message);
                }
            } else {
                result.status = "gagal";
                result.message = err.message;
                res.status(500).send(result);
            }
        });
};

//post detail nasabah payment buat di page loanNasbah
exports.loanNasabah = async (req, res) => {
    let installment = Math.ceil(
        parseInt(req.body.loan) / parseInt(req.body.tenor)
    );
    let dataDetail = {
        date: req.body.date,
        count_tenor: "0",
        type: "Loan",
        nominal: req.body.loan,
        nasabah_id: req.body.nasabah_id,
    };
    let response = await DetailNasabah.create(dataDetail);

    let dataNasabahBaru = {
        tenor: req.body.tenor,
        installment,
        loan: req.body.loan,
    };
    Nasabah.update(dataNasabahBaru, {
        where: {
            id: req.body.nasabah_id,
        },
        raw: true,
    }).then((result) => {
        if (result < 1) {
            res.status(404).send({ message: "Gagal" });
        } else {
            res.status(201).send(response);
        }
    });
};

//GET DETAIL NASABAH BY ID NYA SENDIRI BUAT DI PAGE HISTORY DETAIL NASABAH YANG AKAN DITAMPILIN DI PAGE10 M.U.
exports.getDetailNasabah = async (req, res) => {
    await DetailNasabah.findAll({
        where: {
            nasabah_id: req.params.id,
        },
        order: [["updatedAt", "DESC"]],
        raw: true,
    })
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};
