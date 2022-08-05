const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Datenmodelle werden einfügt
db.aufgaben = require("./aufgabe.model.js")(sequelize, Sequelize);
db.bewertungsaspekte = require("./bewertungsaspekt.model.js")(sequelize, Sequelize);
db.dozenten = require("./dozent.model.js")(sequelize, Sequelize);
db.feedback = require("./feedback.model.js")(sequelize, Sequelize);
db.kurse = require("./kurs.model.js")(sequelize, Sequelize);
db.loesungen = require("./loesung.model.js")(sequelize, Sequelize);
db.studenten = require("./student.model.js")(sequelize, Sequelize);

// 1:n Beziehungen

// Mehrere Aufgaben in einem Kurs
db.kurse.hasMany(db.aufgaben, { as: "aufgaben" });
db.aufgaben.belongsTo(db.kurse);



// db.studenten.hasMany(db.loesungen, { as: "loesungen" });
// db.loesungen.belongsTo(db.studenten);



// n:m Beziehungen,

db.tutorial = require("./tutorial.model.js")(sequelize, Sequelize);
db.tag = require("./tag.model.js")(sequelize, Sequelize);


// Kurse:Studenten 
db.kurse.belongsToMany(db.studenten, {
    through: "kurse_studenten",
});

db.studenten.belongsToMany(db.kurse, {
    through: "kurse_studenten",
});


// Dozenten:Kurse 
db.kurse.belongsToMany(db.dozenten, {
    through: "dozenten_kurse",
});

db.dozenten.belongsToMany(db.kurse, {
    through: "dozenten_kurse",
});




db.tag.belongsToMany(db.tutorial, {
    through: "tutorial_tag",
    as: "tutorials",
    foreignKey: "tag_id",
});
db.tutorial.belongsToMany(db.tag, {
    through: "tutorial_tag",
    as: "tags",
    foreignKey: "tutorial_id",
});


module.exports = db;
