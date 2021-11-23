var jwt = require("jsonwebtoken");
const secretKey = process.env.secretKeyToken;
var bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.saltRoundBcrypt, 10);
const db = require("../models");
const CommunityOfficer = db.CommunityOfficer;

function encryptPass(password) {
    let hashPassword = bcrypt.hashSync(password, saltRounds);
    return hashPassword;
}

const decryptPass = (password, passwordDb) => {
    let hasil = bcrypt.compareSync(password, passwordDb);
    return hasil;
};

const buatToken = (data) => {
    let token = jwt.sign(data, secretKey);
    return token;
};

const cekToken = (token) => {
    let dataDecode = jwt.verify(token, secretKey);
    return dataDecode;
};

const isLogin = (req, res, next) => {
    let token;
    let decode;
    let result = {};

    if (req.headers.authorization) {
        token = req.headers.authorization;
        decode = cekToken(token);
        CommunityOfficer.findOne({
            where: {
                id: decode.id,
            },
        })
            .then((response) => {
                if (!req.locals) {
                    req.locals = {};
                }
                if (decode) {
                    req.locals.token = token;
                    req.locals.decode = decode;
                    next();
                } else {
                    result.status = "failed";
                    result.message = "Something Wrong With Token!";
                    res.status(500).send(result);
                }
            })
            .catch((err) => {
                result.status = "gagal";
                result.message = "Something Wrong With Token";
                res.status(400).send(result);
            });
    } else {
        result.status = "failed";
        result.message = "Unathorize! Please Login";
        res.status(404).send(result);
    }
};

const doLogin = (req, res, next) => {
    let result = {};
    if (req.body.nik) {
        CommunityOfficer.findOne({
            where: {
                nik: req.body.nik,
            },
        })
            .then((response) => {
                if (response) {
                    if (decryptPass(req.body.password, response.password)) {
                        let data = {
                            id: response.id,
                            name: response.name,
                            nik: response.nik,
                        };
                        let token = buatToken(data);
                        result.status = "sukses";
                        result.message = "Berhasil Login";
                        result.data = { token, data };
                        let decode = cekToken(token);
                        res.status(201).send(result);
                    } else {
                        result.status = "gagal";
                        result.message = "NIK or Password Was Wrong!";
                        res.status(400).send(result);
                    }
                } else {
                    result.status = "gagal";
                    result.message = "ID Tidak Ditemukan";
                    res.status(404).send(result);
                }
            })
            .catch((err) => {
                console.log(err);
                result.status = "gagal";
                result.message = err.message;
                res.status(500).send(result);
            });
    } else {
        result.status = "gagal";
        result.message = "NIK or Password Was Wrong!";
        res.status(400).send(result);
    }
};

module.exports = {
    isLogin,
    encryptPass,
    decryptPass,
    buatToken,
    cekToken,
    doLogin,
};
