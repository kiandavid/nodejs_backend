module.exports = (sequelize, Sequelize) => {
    const Dozent = sequelize.define("dozent", {

        vorname: {
            type: Sequelize.STRING
        },
        nachname: {
            type: Sequelize.STRING
        },
        titel: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    },
        { timestamps: false }
    );
    return Dozent;
};