const Connection = require("../config/index");
const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");

const sequelize = new Sequelize(
    Connection.database,
    Connection.user,
    Connection.password,
    {
        host: Connection.host,
        dialect: Connection.dialect,
        operatorsAliases: 0,
        logging: false,
        pool: {
            max: Connection.pool.max,
            min: Connection.pool.min,
            acquire: Connection.pool.acquire,
            idle: Connection.pool.idle,
        },
        timezone: "Asia/Jakarta",
        dialectOptions: {
            timezone: "local",
        },
    }
);

const db = {};
db.Sequelize = Sequelize; //untuk nampung dependency
db.sequelize = sequelize; // untuk connection
db.usingQuery = QueryTypes; //kl butuh querry, bkn model

db.Teller = require("./Teller")(sequelize, Sequelize);
db.CommunityOfficer = require("./CommunityOfficer")(sequelize, Sequelize);
db.CustomerRoutineMeetup = require("./CustomerRoutineMeetup")(
    sequelize,
    Sequelize
);
db.Nasabah = require("./Nasabah")(sequelize, Sequelize);
db.DetailCommunityOfficers = require("./DetailCommunityOfficer")(
    sequelize,
    Sequelize
);

db.DetailCustomerRoutineMeetup = require("./DetailCustomerRoutineMeetup")(
    sequelize,
    Sequelize
);
db.DetailNasabah = require("./DetailNasabah")(sequelize, Sequelize);

//
db.Teller.hasMany(db.CommunityOfficer, {
    foreignKey: "teller_id",
    targetKey: "id",
});

db.CommunityOfficer.hasMany(db.CustomerRoutineMeetup, {
    foreignKey: "co_id",
    targetKey: "id",
});

db.CustomerRoutineMeetup.hasMany(db.Nasabah, {
    foreignKey: "crm_id",
    targetKey: "id",
});

db.CustomerRoutineMeetup.hasMany(db.DetailCustomerRoutineMeetup, {
    foreignKey: "crm_id",
    targetKey: "id",
});

db.CommunityOfficer.hasMany(db.DetailCommunityOfficers, {
    foreignKey: "co_id",
    targetKey: "id",
});

db.Nasabah.hasMany(db.DetailNasabah, {
    foreignKey: "nasabah_id",
    targetKey: "id",
});

module.exports = db;
