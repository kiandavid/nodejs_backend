const db = require("../models");
const Kurs = db.kurse;
const Studenten = db.studenten;
const Dozenten = db.dozenten;
const Aufgaben = db.aufgaben;
const Op = db.Sequelize.Op;

// Create and Save a new Course
exports.create = (req, res) => {
    // Validate request
    if (!req.body.bezeichnung) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Course
    const kurs = {
        bezeichnung: req.body.bezeichnung,
        semester: req.body.semester,
    };
    // Save Course in the database
    Kurs.create(kurs)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Course."
            });
        });
};
// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
    const bezeichnung = req.query.bezeichnung;
    var condition = bezeichnung ? { bezeichnung: { [Op.iLike]: `%${bezeichnung}%` } } : null;
    Kurs.findAll({
        where: condition,
        include: [
            {
                // Für 1:n Beziehungen sind Aliase wie as: "aufgaben" okay
                model: Aufgaben,
                as: "aufgaben",
                attributes: ["id", "bezeichnung", "punkte_max", "aufgabe"],
            },
            {
                // aber hier funktionieren Aliase nicht. Deswegen heißt das das Studenten-Array "students"
                model: Studenten,
                attributes: ["id", "vorname", "nachname", "email", "matrikelnummer", "studiengang"]
            },
            {
                model: Dozenten,
                attributes: ["id", "titel", "vorname", "nachname", "email"]
            }
        ]

    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Courses."
            });
        });
};
// Find a single Course with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Kurs.findByPk(id, {
        include: [
            {
                // Für 1:n Beziehungen sind Aliase wie as: "aufgaben" okay
                model: Aufgaben,
                as: "aufgaben",
                attributes: ["id", "bezeichnung", "punkte_max", "aufgabe"],
            },
            {
                // aber hier funktionieren Aliase nicht. Deswegen heißt das das Studenten-Array "students"
                model: Studenten,
                attributes: ["id", "vorname", "nachname", "email", "matrikelnummer", "studiengang"]
            },
            {
                model: Dozenten,
                attributes: ["id", "titel", "vorname", "nachname", "email"]
            }
        ]
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Course with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error" + err
            });
        });
};
// Update a Course by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Kurs.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Course was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Course with id=" + id
            });
        });
};
// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    const studentId = req.params.studentId;
    if (studentId == 0) {
        Kurs.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: `Course was deleted successfully!`
                    });
                } else {
                    res.send({
                        message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Course with id=" + id
                });
            });
    } else {
        const kursId = req.params.id;
        return Kurs.findByPk(kursId)
            .then((kurs) => {
                if (!kurs) {
                    res.status(404).send({
                        message: `Cannot find kurs with id=${kursId}.`
                    });
                }
                return Studenten.findByPk(studentId)
                    .then((student) => {
                        if (!student) {
                            res.status(404).send({
                                message: `Cannot find Student with id=${studentId}.`
                            });
                        }
                        kurs.removeStudent(student);
                        console.log(`>> removed Student id=${student.id} from kurs id=${kurs.id}`);
                        res.send({
				message: `Student mit der id=${studentId} aus Kurs entfernt`
			});
                    });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error: " + err
                });
            });
    }

};
// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
    Kurs.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Course were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Courses."
            });
        });
};

// Fügt dem Kurs einen Studenten zu
exports.addStudent = (req, res) => {
    const kursId = req.params.id;
    const studentId = req.body.studentId;
    return Kurs.findByPk(kursId)
        .then((kurs) => {
            if (!kurs) {
                res.status(404).send({
                    message: `Cannot find kurs with id=${kursId}.`
                });
            }
            return Studenten.findByPk(studentId)
                .then((student) => {
                    if (!student) {
                        res.status(404).send({
                            message: `Cannot find Student with id=${studentId}.`
                        });
                    }
                    kurs.addStudent(student);
                    console.log(`>> added Student id=${student.id} to kurs id=${kurs.id}`);
                    res.send(kurs);
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error: " + err
            });
        });
};
