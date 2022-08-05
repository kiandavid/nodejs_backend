module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define("feedback", {
        anmerkung: {
            type: Sequelize.STRING
        }
    });
    return Feedback;
};