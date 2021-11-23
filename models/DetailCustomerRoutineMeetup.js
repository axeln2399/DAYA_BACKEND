const tableDCRM = (sequelize, Sequelize) => {
    const DetailCRM = sequelize.define("detailcustomerroutinemeetups", {
        date: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        payment: {
            type: Sequelize.STRING,
            defaultValue: "0",
        },
        loan: {
            type: Sequelize.STRING,
            defaultValue: "0",
        },
        status: {
            type: Sequelize.ENUM("Done", "Process"),
            allowNull: false,
        },
    });

    return DetailCRM;
};

module.exports = tableDCRM;
