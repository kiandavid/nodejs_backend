const db = require("../models");
const Dozent = db.dozenten; //definiert unter models/index.js
const Op = db.Sequelize.Op;

// Dozent = Obj
// dozenten = objekte //definiert unter models/index.js
// Lecturer = Objects, für messages und Kommentare
// email = Suche nach TItel

// ###POST###

// dozent = Selbst erstelltes Objekt
// create -> alle Attribute rein

// Create and Save a new Lecturer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Lecturer
    const dozent = {
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        email: req.body.email,
        titel: req.body.titel
    };
    // Save Lecturer in the database
    Dozent.create(dozent)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Lecturer."
            });
        });
};
// Retrieve all Lecturers from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    Dozent.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Lecturers."
            });
        });
};
// ############################################################################################################

// Find a single Lecturer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Dozent.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Lecturer with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Lecturer with id=" + id
            });
        });
};
// Update a Lecturer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Dozent.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Lecturer was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Lecturer with id=${id}. Maybe Lecturer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Lecturer with id=" + id
            });
        });
};
// Delete a Lecturer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Dozent.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Lecturer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Lecturer with id=${id}. Maybe Lecturer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Lecturer with id=" + id
            });
        });
};
// Delete all Lecturers from the database.
exports.deleteAll = (req, res) => {
    Dozent.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Lecturer were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Lecturers."
            });
        });
};

