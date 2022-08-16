const db = require("../models");
const Aufgabe = db.aufgaben;
const Loesung = db.loesungen;
const Op = db.Sequelize.Op;

const multer = require('multer');
// const path = require('path');

// Multer middleware für File upload

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Aufgaben');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

exports.upload = multer({ storage: fileStorageEngine }).single("aufgabe");



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
        aufgabe: req.file.path,
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
    Aufgabe.findAll({
        where: condition,
        include: [
            {
                model: Loesung,
                as: "loesungen",
                attributes: ["id", "bezeichnung", "loesung", "punkte"]
            }
        ]
    })
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
    Aufgabe.findByPk(id, {
        include: [
            {
                model: Loesung,
                as: "loesungen",
                attributes: ["id", "bezeichnung", "loesung", "punkte"]
            }
        ]
    })
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

