const tableDCO = (sequelize, Sequelize) => {
    const DetailCommunityOfficer = sequelize.define("detailcommunityofficers", {
        type: {
            type: Sequelize.ENUM("Payment", "Loan"),
            allowNull: false,
        },
        nominal: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM("Done", "Process"),
            allowNull: false,
        },
    });
    return DetailCommunityOfficer;
};

module.exports = tableDCO;
