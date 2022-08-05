module.exports = app => {
    const dozenten = require("../controllers/dozent.controller.js");
    var router = require("express").Router();
    // Create a new Dozent
    router.post("/", dozenten.create);
    // Add a Kurs to Dozent-Objekt
    router.post("/:id", dozenten.addKurs);
    // Retrieve all dozenten
    router.get("/", dozenten.findAll);
    // Retrieve a single Dozent with id
    router.get("/:id", dozenten.findOne);
    // Update a Dozent with id
    router.put("/:id", dozenten.update);
    // Delete a Dozent with id
    router.delete("/:id", dozenten.delete);
    // Create a new Dozent
    router.delete("/", dozenten.deleteAll);
    app.use('/api/dozenten', router);
};