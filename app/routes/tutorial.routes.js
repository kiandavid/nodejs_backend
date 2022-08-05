module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", tutorials.create);
    // Retrieve all tutorials
    router.get("/", tutorials.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findById);
    app.use('/api/tutorials', router);
};