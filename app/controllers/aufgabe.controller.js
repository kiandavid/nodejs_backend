const db = require("../models");
const Aufgabe = db.aufgaben; //definiert unter models/index.js
const Op = db.Sequelize.Op;

// Aufgabe = Obj
// aufgaben = objekte //definiert unter models/index.js
// Task = Objects, für messages und Kommentare
// bezeichnung = Suche nach TItel

// ###POST###

// aufgabe = Selbst erstelltes Objekt
// create -> alle Attribute rein

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body.bezeichnung) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Task
    const aufgabe = {
        bezeichnung: req.body.bezeichnung,
        punkte_max: req.body.punkte_max,
        aufgabe: req.body.aufgabe,
        kurId: req.body.kursId
    };
    // Save Task in the database
    Aufgabe.create(aufgabe)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        });
};
// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    const bezeichnung = req.query.bezeichnung;
    var condition = bezeichnung ? { bezeichnung: { [Op.iLike]: `%${bezeichnung}%` } } : null;
    Aufgabe.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tasks."
            });
        });
};
// ############################################################################################################

// Find a single Task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Aufgabe.findByPk(id, { include: ["kurs"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Task with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Task with id=" + id
            });
        });
};
// Update a Task by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Aufgabe.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task with id=" + id
            });
        });
};
// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Aufgabe.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
};
// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
    Aufgabe.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Task were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Tasks."
            });
        });
};

