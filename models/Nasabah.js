const tableNasabah = (sequelize, Sequelize) => {
    const Nasabah = sequelize.define("nasabahs", {
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
        no_telp: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        tenor: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        installment: {
            type: Sequelize.STRING,
            defaultValue: "0",
        },
        loan: {
            type: Sequelize.STRING,
            defaultValue: "0",
        },
    });

    Nasabah.beforeBulkCreate((data, options) => {
        for (const datas of data) {
            datas.installment = Math.ceil(
                parseInt(datas.loan) / parseInt(datas.tenor)
            ).toString();
            let date = new Date().toLocaleDateString("id-ID");
            let dataForDetails = {
                date: date,
                type: "Loan",
                nasabah_id: datas.id,
                nominal: datas.loan,
            };
            sequelize.models.detailnasabahs.create(dataForDetails);
        }
    });

    Nasabah.beforeCreate((data, options) => {
        data.installment = Math.ceil(
            parseInt(data.loan) / parseInt(data.tenor)
        ).toString();
        let date = new Date().toLocaleDateString("id-ID");
        let dataForDetails = {
            date,
            type: "Loan",
            nasabah_id: data.id,
            nominal: data.loan,
        };
        sequelize.models.detailnasabahs.create(dataForDetails);
    });

    Nasabah.afterFind(async (data, options) => {
        for (const datas of data) {
            let response = await sequelize.models.detailnasabahs.findAll({
                where: {
                    nasabah_id: datas.id,
                    type: "Payment",
                },
                order: [["updatedAt", "DESC"]],
                limit: 1,
                raw: true,
            });
            if (response.length < 1) {
                datas.count_tenor = "0";
            } else {
                datas.count_tenor = response[0].count_tenor;
            }
            // console.log(datas);
        }
    });

    return Nasabah;
};

module.exports = tableNasabah;
