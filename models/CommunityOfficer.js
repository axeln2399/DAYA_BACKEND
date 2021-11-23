const tableCO = (sequelize, Sequelize) => {
    const CommunityOfficer = sequelize.define("communityofficers", {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        region: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nik: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return CommunityOfficer;
};

module.exports = tableCO;
