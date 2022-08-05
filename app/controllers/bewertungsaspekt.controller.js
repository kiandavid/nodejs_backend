const db = require("../models");
const Bewertungsaspekt = db.bewertungsaspekte; //definiert unter models/index.js
const Op = db.Sequelize.Op;

// Bewertungsaspekt = Obj
// bewertungsaspekte = objekte //definiert unter models/index.js
// Evaluation aspect = Objects, für messages und Kommentare
// typ = Suche nach TItel

// ###POST###

// bewertungsaspekt = Selbst erstelltes Objekt
// create -> alle Attribute rein

// Create and Save a new Evaluation aspect
exports.create = (req, res) => {
    // Validate request
    if (!req.body.typ) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Evaluation aspect
    const bewertungsaspekt = {
        typ: req.body.typ,
        punkte: req.body.punkte
    };
    // Save Evaluation aspect in the database
    Bewertungsaspekt.create(bewertungsaspekt)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Evaluation aspect."
            });
        });
};
// Retrieve all Evaluation aspects from the database.
exports.findAll = (req, res) => {
    const typ = req.query.typ;
    var condition = typ ? { typ: { [Op.iLike]: `%${typ}%` } } : null;
    Bewertungsaspekt.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Evaluation aspects."
            });
        });
};
// ############################################################################################################

// Find a single Evaluation aspect with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Bewertungsaspekt.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Evaluation aspect with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Evaluation aspect with id=" + id
            });
        });
};
// Update a Evaluation aspect by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Bewertungsaspekt.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Evaluation aspect was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Evaluation aspect with id=${id}. Maybe Evaluation aspect was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Evaluation aspect with id=" + id
            });
        });
};
// Delete a Evaluation aspect with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Bewertungsaspekt.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Evaluation aspect was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Evaluation aspect with id=${id}. Maybe Evaluation aspect was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Evaluation aspect with id=" + id
            });
        });
};
// Delete all Evaluation aspects from the database.
exports.deleteAll = (req, res) => {
    Bewertungsaspekt.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Evaluation aspect were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Evaluation aspects."
            });
        });
};

