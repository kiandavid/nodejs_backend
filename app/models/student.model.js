module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        vorname: {
            type: Sequelize.STRING
        },
        nachname: {
            type: Sequelize.STRING
        },
        matrikelnummer: {
            type: Sequelize.INTEGER
        },
        studiengang: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    });
    return Student;
};