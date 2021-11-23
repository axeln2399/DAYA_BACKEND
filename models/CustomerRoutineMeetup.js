const tableCRM = (sequelize, Sequelize) => {
    const CustomerRoutineMeetup = sequelize.define("customerroutinemeetups", {
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
        address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    CustomerRoutineMeetup.afterFind(async (data, options) => {
        for (const datas of data) {
            let jumlahNasabah = await sequelize.models.nasabahs.count({
                where: {
                    crm_id: datas.id,
                },
                raw: true,
            });
            let lastDate =
                await sequelize.models.detailcustomerroutinemeetups.findAll({
                    where: {
                        crm_id: datas.id,
                    },
                    attributes: ["date", "status"],
                    order: [["updatedAt", "DESC"]],
                    limit: 1,
                    raw: true,
                });
            if (lastDate[0]) {
                datas.lastDate = lastDate[0].date;
                datas.status = lastDate[0].status;
            } else {
                datas.lastDate = null;
                datas.status = null;
            }

            datas.jumlahNasabah = jumlahNasabah;
        }
    });

    return CustomerRoutineMeetup;
};

module.exports = tableCRM;
