module.exports = (sequelize, Sequelize) => {
    const Bewertungsaspekt = sequelize.define("bewertungsaspekt", {
        typ: {
            type: Sequelize.STRING
        },
        punkte: {
            type: Sequelize.DECIMAL
        }
    });
    return Bewertungsaspekt;
};