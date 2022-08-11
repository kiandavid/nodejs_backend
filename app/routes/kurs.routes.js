module.exports = app => {
    const kurse = require("../controllers/kurs.controller.js");
    var router = require("express").Router();
    // Create a new Kurs
    router.post("/", kurse.create);
    // Add a student to a Kurs
    router.post("/:id", kurse.addStudent);
    // Retrieve all kurse
    router.get("/", kurse.findAll);
    // Retrieve a single Kurs with id
    router.get("/:id", kurse.findOne);
    // Update a Kurs with id
    router.put("/:id", kurse.update);
    // Delete a Kurs with id
    router.delete("/:id/:studentId", kurse.delete);
    // Create a new Kurs
    router.delete("/", kurse.deleteAll);
    app.use('/api/kurse', router);
};