require("dotenv").config();

let targetDB = process.env.namadatabase;
if (process.env.NODE_TEST === "test") {
    targetDB = process.env.namadatabase_test;
}

const connection = {
    host: "localhost",
    user: "root",
    password: "Btpns123*",
    database: targetDB,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    port: 3000,
};

module.exports = connection;
