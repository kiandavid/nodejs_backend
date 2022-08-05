module.exports = app => {
    const studenten = require("../controllers/student.controller.js");
    var router = require("express").Router();
    // Create a new Student
    router.post("/", studenten.create);
    // Retrieve all studenten
    router.get("/", studenten.findAll);
    // Retrieve a single Student with id
    router.get("/:id", studenten.findOne);
    // Update a Student with id
    router.put("/:id", studenten.update);
    // Delete a Student with id
    router.delete("/:id", studenten.delete);
    // Create a new Student
    router.delete("/", studenten.deleteAll);
    app.use('/api/studenten', router);
};