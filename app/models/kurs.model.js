module.exports = (sequelize, Sequelize) => {
    const Kurs = sequelize.define("kurs", {
        bezeichnung: {
            type: Sequelize.STRING
        },
        semester: {
            type: Sequelize.STRING
        },

    },
        { timestamps: false }
    );
    return Kurs;
};