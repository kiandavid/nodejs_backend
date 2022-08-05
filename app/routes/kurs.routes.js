module.exports = app => {
    const kurse = require("../controllers/kurs.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", kurse.create);
    // Retrieve all kurse
    router.get("/", kurse.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", kurse.findOne);
    // Update a Tutorial with id
    router.put("/:id", kurse.update);
    // Delete a Tutorial with id
    router.delete("/:id", kurse.delete);
    // Create a new Tutorial
    router.delete("/", kurse.deleteAll);
    app.use('/api/kurse', router);
};