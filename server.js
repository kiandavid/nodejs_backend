const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
});
const db = require("./app/models");

// Daten werden gespeichert

// db.sequelize.sync()
//     .then(() => {
//         console.log("Synced db.");
//         run();
//     })
//     .catch((err) => {
//         console.log("Failed to sync db: " + err.message);
//     });

// Bei Neustart wird die DB resettet

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });



const TutorialController = require("./app/controllers/tutorial.controller");
const TagController = require("./app/controllers/tag.controller");
const run = async () => {

    const tut1 = await TutorialController.create({
        title: "Tut#1",
        description: "Tut#1 Description",
    });
    const tut2 = await TutorialController.create({
        title: "Tut#2",
        description: "Tut#2 Description",
    });

    const tag1 = await TagController.create({
        name: "Tag#1",
    });

    const tag2 = await TagController.create({
        name: "Tag#2",
    });
};

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    run();
});






// Routen der Entitäten werden einfügt
require("./app/routes/aufgabe.routes")(app);
require("./app/routes/bewertungsaspekt.routes")(app);
require("./app/routes/dozent.routes")(app);
require("./app/routes/feedback.routes")(app);
require("./app/routes/kurs.routes")(app);
require("./app/routes/loesung.routes")(app);
require("./app/routes/student.routes")(app);

//test
require("./app/routes/tutorial.routes")(app);
require("./app/routes/tag.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
