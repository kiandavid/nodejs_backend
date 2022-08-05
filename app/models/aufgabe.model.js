module.exports = (sequelize, Sequelize) => {
    const Aufgabe = sequelize.define("aufgabe", {
        bezeichnung: {
            type: Sequelize.STRING
        },
        punkte_max: {
            type: Sequelize.DECIMAL
        },
        aufgabe: {
            type: Sequelize.BLOB
        }
    });
    return Aufgabe;
};