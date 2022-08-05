module.exports = app => {
    const loesungen = require("../controllers/loesung.controller.js");
    var router = require("express").Router();
    // Create a new Loesung
    router.post("/", loesungen.create);
    // Retrieve all loesungen
    router.get("/", loesungen.findAll);
    // Retrieve a single Loesung with id
    router.get("/:id", loesungen.findOne);
    // Update a Loesung with id
    router.put("/:id", loesungen.update);
    // Delete a Loesung with id
    router.delete("/:id", loesungen.delete);
    // Create a new Loesung
    router.delete("/", loesungen.deleteAll);
    app.use('/api/loesungen', router);
};