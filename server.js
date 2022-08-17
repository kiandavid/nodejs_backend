const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
var corsOptions = {
	origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// aufgabe
app.get("/api/aufgabe", (req, res) => {
	let path = req.query.path;
	res.sendFile(__dirname + "/" + path);
});
const db = require("./app/models");

// Daten werden gespeichert

db.sequelize.sync()
	.then(() => {
		console.log("Synced db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});



// Bei Neustart wird die DB resettet

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// Statischer Aufgaben-Ordner
app.use("/Aufgaben", express.static("./Aufgaben"));


// Routen der Entitäten werden einfügt
require("./app/routes/aufgabe.routes")(app);
require("./app/routes/bewertungsaspekt.routes")(app);
require("./app/routes/dozent.routes")(app);
require("./app/routes/feedback.routes")(app);
require("./app/routes/kurs.routes")(app);
require("./app/routes/loesung.routes")(app);
require("./app/routes/student.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
