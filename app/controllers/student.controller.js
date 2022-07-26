const db = require("../models");
const Student = db.studenten;
const Loesung = db.loesungen;
const Kurs = db.kurse;
const Op = db.Sequelize.Op;

// Create and Save a new Student
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Student
    const student = {
        email: req.body.email,
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        matrikelnummer: req.body.matrikelnummer,
        studiengang: req.body.studiengang
    };
    // Save Student in the database
    Student.create(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Student."
            });
        });
};
// Retrieve all Students from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    Student.findAll({
        where: condition,
        include: [
            {
                //  hier funktionieren Aliase nicht
                model: Kurs,
                attributes: ["id", "bezeichnung", "semester"]
            },
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
                    err.message || "Some error occurred while retrieving Students."
            });
        });
};

exports.addLoesung = (studentId, loesungId) => {
    return Student.findByPk(studentId)
        .then((student) => {
            if (!student) {
                console.log("student not found!");
                return null;
            }
            return loesung.findByPk(loesungId).then((loesung) => {
                if (!loesung) {
                    console.log("loesung not found!");
                    return null;
                }
                student.addLoesung(loesung);
                console.log(`>> added loesung id=${loesung.id} to student id=${student.id}`);
                return student;
            });
        })
        .catch((err) => {
            console.log(">> Error while adding loesung to student: ", err);
        });
};



// ############################################################################################################

// Find a single Student with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findByPk(id, {
        include: [
            {
                //  hier funktionieren Aliase nicht
                model: Kurs,
                attributes: ["id", "bezeichnung", "semester"]
            },
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
                    message: `Cannot find Student with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Student with id=" + id
            });
        });
};
// Update a Student by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Student.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Student was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Student with id=" + id
            });
        });
};
// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Student.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Student was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
};
// Delete all Students from the database.
exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Student were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Students."
            });
        });
};

