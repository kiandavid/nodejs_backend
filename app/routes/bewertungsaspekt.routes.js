module.exports = app => {
    const bewertungsaspekte = require("../controllers/bewertungsaspekt.controller.js");
    var router = require("express").Router();
    // Create a new Bewertungsaspekt
    router.post("/", bewertungsaspekte.create);
    // Retrieve all bewertungsaspekte
    router.get("/", bewertungsaspekte.findAll);
    // Retrieve a single Bewertungsaspekt with id
    router.get("/:id", bewertungsaspekte.findOne);
    // Update a Bewertungsaspekt with id
    router.put("/:id", bewertungsaspekte.update);
    // Delete a Bewertungsaspekt with id
    router.delete("/:id", bewertungsaspekte.delete);
    // Create a new Bewertungsaspekt
    router.delete("/", bewertungsaspekte.deleteAll);
    app.use('/api/bewertungsaspekte', router);
};