module.exports = app => {
    const tags = require("../controllers/tag.controller.js");
    var router = require("express").Router();
    // Create a new tag
    router.post("/", tags.create);
    // Add a tutorial to a tag
    router.post("/:id", tags.addTutorial);
    // Retrieve all tags
    router.get("/", tags.findAll);
    // Retrieve a single tag with id
    router.get("/:id", tags.findById);
    app.use('/api/tags', router);
};