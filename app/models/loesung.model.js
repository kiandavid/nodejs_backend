module.exports = (sequelize, Sequelize) => {
    const Loesung = sequelize.define("loesung", {
        bezeichnung: {
            type: Sequelize.STRING
        },
        loesung: {
            type: Sequelize.STRING
        },
        punkte: {
            type: Sequelize.DECIMAL
        }
    },
        { timestamps: false }
    );
    return Loesung;
};