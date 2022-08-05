module.exports = app => {
    const studenten = require("../controllers/student.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", studenten.create);
    // Retrieve all studenten
    router.get("/", studenten.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", studenten.findOne);
    // Update a Tutorial with id
    router.put("/:id", studenten.update);
    // Delete a Tutorial with id
    router.delete("/:id", studenten.delete);
    // Create a new Tutorial
    router.delete("/", studenten.deleteAll);
    app.use('/api/studenten', router);
};