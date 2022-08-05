module.exports = app => {
    const aufgaben = require("../controllers/aufgabe.controller.js");
    var router = require("express").Router();
    // Create a new Aufgabe
    router.post("/", aufgaben.create);
    // Retrieve all aufgaben
    router.get("/", aufgaben.findAll);
    // Retrieve a single Aufgabe with id
    router.get("/:id", aufgaben.findOne);
    // Update a Aufgabe with id
    router.put("/:id", aufgaben.update);
    // Delete a Aufgabe with id
    router.delete("/:id", aufgaben.delete);
    // Create a new Aufgabe
    router.delete("/", aufgaben.deleteAll);
    app.use('/api/aufgaben', router);

};