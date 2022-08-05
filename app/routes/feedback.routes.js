module.exports = app => {
    const feedback = require("../controllers/feedback.controller.js");
    var router = require("express").Router();
    // Create a new Feedback
    router.post("/", feedback.create);
    // Retrieve all feedback
    router.get("/", feedback.findAll);
    // Retrieve a single Feedback with id
    router.get("/:id", feedback.findOne);
    // Update a Feedback with id
    router.put("/:id", feedback.update);
    // Delete a Feedback with id
    router.delete("/:id", feedback.delete);
    // Create a new Feedback
    router.delete("/", feedback.deleteAll);
    app.use('/api/feedback', router);
};