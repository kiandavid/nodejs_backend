const db = require("../models");
const Feedback = db.feedback; //definiert unter models/index.js
const Op = db.Sequelize.Op;

// Feedback = Obj
// feedback = objekte //definiert unter models/index.js
// Feedback = Objects, für messages und Kommentare
// anmerkung = Suche nach TItel

// ###POST###

// feedback = Selbst erstelltes Objekt
// create -> alle Attribute rein

// Create and Save a new Feedback
exports.create = (req, res) => {
    // Validate request
    if (!req.body.anmerkung) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Feedback
    const feedback = {
        anmerkung: req.body.anmerkung,
    };
    // Save Feedback in the database
    Feedback.create(feedback)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Feedback."
            });
        });
};
// Retrieve all Feedbacks from the database.
exports.findAll = (req, res) => {
    const anmerkung = req.query.anmerkung;
    var condition = anmerkung ? { anmerkung: { [Op.iLike]: `%${anmerkung}%` } } : null;
    Feedback.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Feedbacks."
            });
        });
};
// ############################################################################################################

// Find a single Feedback with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Feedback.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Feedback with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Feedback with id=" + id
            });
        });
};
// Update a Feedback by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Feedback.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Feedback was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Feedback with id=${id}. Maybe Feedback was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Feedback with id=" + id
            });
        });
};
// Delete a Feedback with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Feedback.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Feedback was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Feedback with id=${id}. Maybe Feedback was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Feedback with id=" + id
            });
        });
};
// Delete all Feedbacks from the database.
exports.deleteAll = (req, res) => {
    Feedback.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Feedback were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Feedbacks."
            });
        });
};

