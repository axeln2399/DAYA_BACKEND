const db = require("../models/index");
const Teller = db.Teller;
const usingQuery = db.usingQuery;
const Op = db.Sequelize.Op;

//export.namaFunction (bebas namanya, nanti dipanggil di router)
exports.createTeller = async (req, res) => {
  if (!req.body.name) {
    res.status(404).send({ message: "failed" });
    return;
  }

  const teller = {
    id: req.body.id,
    name: req.body.name,
  };

  let response = await Teller.create(teller);

  // let response = await db.sequelize.query(
  //     "INSERT INTO tellers (name,age) values (?,?)",
  //     {
  //         replacements: [req.body.name, 2],
  //         type: db.usingQuery.INSERT,
  //     }
  // );
  res.status(201).send(response);
  // Teller.create(teller)
  //     .then((data) => {
  //         res.status(201).send(data);
  //     })
  //     .catch((err) => {
  //         res.status(500).send({ message: err.message });
  //     });
};

//post teller 

exports.createTeller = (req, res) => {
  Teller.create(req.body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(404).send({ message: "failed" });
    });
};

//cara get all pake model
exports.findAllTeller = (req, res) => {
  Teller.findAll({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// exports.findQuery = async (req, res) => {
//     let response = await db.sequelize.query(
//         'Select * from tellers where id="2"',
//         { type: db.usingQuery.SELECT }
//     );
//     res.status(200).send(response);
// };
