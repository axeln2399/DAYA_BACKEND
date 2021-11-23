const tableTeller = (sequelize, Sequelize) => {
    const Teller = sequelize.define("tellers", {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
    });
    return Teller;
};

module.exports = tableTeller;
