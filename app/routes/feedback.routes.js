module.exports = app => {
    const feedback = require("../controllers/feedback.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", feedback.create);
    // Retrieve all feedback
    router.get("/", feedback.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", feedback.findOne);
    // Update a Tutorial with id
    router.put("/:id", feedback.update);
    // Delete a Tutorial with id
    router.delete("/:id", feedback.delete);
    // Create a new Tutorial
    router.delete("/", feedback.deleteAll);
    app.use('/api/feedback', router);
};