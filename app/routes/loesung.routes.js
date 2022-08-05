module.exports = app => {
    const loesungen = require("../controllers/loesung.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", loesungen.create);
    // Retrieve all loesungen
    router.get("/", loesungen.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", loesungen.findOne);
    // Update a Tutorial with id
    router.put("/:id", loesungen.update);
    // Delete a Tutorial with id
    router.delete("/:id", loesungen.delete);
    // Create a new Tutorial
    router.delete("/", loesungen.deleteAll);
    app.use('/api/loesungen', router);
};