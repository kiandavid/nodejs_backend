module.exports = app => {
    const bewertungsaspekte = require("../controllers/bewertungsaspekt.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", bewertungsaspekte.create);
    // Retrieve all bewertungsaspekte
    router.get("/", bewertungsaspekte.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", bewertungsaspekte.findOne);
    // Update a Tutorial with id
    router.put("/:id", bewertungsaspekte.update);
    // Delete a Tutorial with id
    router.delete("/:id", bewertungsaspekte.delete);
    // Create a new Tutorial
    router.delete("/", bewertungsaspekte.deleteAll);
    app.use('/api/bewertungsaspekte', router);
};