const db = require("../models");
const Tutorial = db.tutorial;
const Tag = db.tag;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Tag.create({
        name: req.body.name,
    })
        .then((tag) => {
            res.send(tag);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tag."
            });
        });
};


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    Tag.findAll({
        where: condition,
        include: [
            {
                model: Tutorial,
                as: "tutorials",
                attributes: ["id", "title", "description"],
                through: {
                    attributes: [],
                }
            },
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tags."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    return Tag.findByPk(id, {
        include: [
            {
                model: Tutorial,
                as: "tutorials",
                attributes: ["id", "title", "description"],
                through: {
                    attributes: [],
                }
            },
        ],
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tag with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error " + err + " retrieving Tag with id=" + id
            });
        });
};




exports.addTutorial = (req, res) => {
    const tagId = req.params.id;
    const tutorialId = req.body.tutorialId;
    return Tag.findByPk(tagId)
        .then((tag) => {
            if (!tag) {
                res.status(404).send({
                    message: `Cannot find Tag with id=${tagId}.`
                });
            }
            return Tutorial.findByPk(tutorialId).then((tutorial) => {
                if (!tutorial) {
                    res.status(404).send({
                        message: `Cannot find Tutorial with id=${tutorialId}.`
                    });
                }
                tag.addTutorial(tutorial);
                console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
                res.send(tag);
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error: " + err + " while adding Tutorial to Tag"
            });
        });
};