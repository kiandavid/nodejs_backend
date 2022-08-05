module.exports = app => {
    const aufgaben = require("../controllers/aufgabe.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", aufgaben.create);
    // Retrieve all aufgaben
    router.get("/", aufgaben.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", aufgaben.findOne);
    // Update a Tutorial with id
    router.put("/:id", aufgaben.update);
    // Delete a Tutorial with id
    router.delete("/:id", aufgaben.delete);
    // Create a new Tutorial
    router.delete("/", aufgaben.deleteAll);
    app.use('/api/aufgaben', router);

};