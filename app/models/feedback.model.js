module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define("feedback", {
        anmerkung: {
            type: Sequelize.STRING
        }
    },
        { timestamps: false }
    );
    return Feedback;
};