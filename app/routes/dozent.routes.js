module.exports = app => {
    const dozenten = require("../controllers/dozent.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", dozenten.create);
    // Retrieve all dozenten
    router.get("/", dozenten.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", dozenten.findOne);
    // Update a Tutorial with id
    router.put("/:id", dozenten.update);
    // Delete a Tutorial with id
    router.delete("/:id", dozenten.delete);
    // Create a new Tutorial
    router.delete("/", dozenten.deleteAll);
    app.use('/api/dozenten', router);
};