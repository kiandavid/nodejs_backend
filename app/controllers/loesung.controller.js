const db = require("../models");
const Loesung = db.loesungen;
const Student = db.studenten;
const Aufgabe = db.aufgaben;
const Bewertungsaspekt = db.bewertungsaspekte;
const Op = db.Sequelize.Op;


// Create and Save a new Solution
exports.create = (req, res) => {
    // Validate request
    if (!req.body.bezeichnung) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Solution
    const loesung = {
        bezeichnung: req.body.bezeichnung,
        loesung: req.body.loesung,
        punkte: req.body.punkte,
        aufgabeId: req.body.aufgabeId,
        studentId: req.body.studentId
    };
    // Save Solution in the database
    Loesung.create(loesung)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Solution."
            });
        });
};
// Retrieve all Solutions from the database.
exports.findAll = (req, res) => {
    Loesung.findAll({
        include: [
            {
                model: Bewertungsaspekt,
                as: "bewertungsaspekte",
                attributes: ["id", "typ", "punkte",],
                include: "feedback"
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Solutions."
            });
        });
};
// ############################################################################################################

// Find a single Solution with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Loesung.findByPk(id, {
        include: [
            {
                model: Bewertungsaspekt,
                as: "bewertungsaspekte",
                attributes: ["id", "typ", "punkte"],
                include: "feedback"
            }
        ],
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Solution with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Solution with id=" + id
            });
        });
};
// Update a Solution by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Loesung.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Solution was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Solution with id=${id}. Maybe Solution was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Solution with id=" + id
            });
        });
};
// Delete a Solution with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Loesung.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Solution was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Solution with id=${id}. Maybe Solution was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Solution with id=" + id
            });
        });
};
// Delete all Solutions from the database.
exports.deleteAll = (req, res) => {
    Loesung.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Solution were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Solutions."
            });
        });
};

