const tableDNasabah = (sequelize, Sequelize) => {
    const DetailNasabah = sequelize.define("detailnasabahs", {
        date: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        count_tenor: {
            type: Sequelize.STRING,
            defaultValue: "0",
        },
        type: {
            type: Sequelize.ENUM("Payment", "Loan"),
            allowNull: false,
        },
        nominal: {
            type: Sequelize.STRING,
            defaultValue: "0",
        },
    });
    return DetailNasabah;
};

module.exports = tableDNasabah;
