const db = require("../models/index");
const CommunityOfficer = db.CommunityOfficer;
const usingQuery = db.usingQuery;
const Op = db.Sequelize.Op;

function setBodyCO(body) {
  return {
    id: body.id,
    name: body.name,
    region: body.region,
    nik: body.nik,
    password: body.password,
    teller_id: body.teller_id,
  };
}

exports.insertCO = (req, res) => {
  let result = {};
  let bodyCO = setBodyCO(req.body);
  CommunityOfficer.create(bodyCO)
    .then((response) => {
      console.log(response)
      res.status(201).send(response);
    })
    .catch((err) => {
      result.status = "gagal";
      result.message = err.message;
      res.status(500).send(result);
    });
};

exports.findByIdCO = (req, res) => {
  let result = {};
  CommunityOfficer.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ["password"] },
  })
    .then((response) => {
      result.status = "sukses";
      result.message = "Berhasil GET CO By Id";
      result.data = response;
      res.status(200).send(result);
    })
    .catch((err) => {
      result.status = "gagal";
      result.message = err.message;
      res.status(500).send(result);
    });
};
