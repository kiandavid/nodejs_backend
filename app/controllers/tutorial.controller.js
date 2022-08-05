const db = require("../models");
const Tutorial = db.tutorial;
const Tag = db.tag;

exports.create = (req, res) => {

    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Tutorial.create({
        title: req.body.title,
        description: req.body.description,
    })
        .then((tutorial) => {
            res.send(tutorial)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error " + err
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    Tutorial.findAll({
        where: condition,
        include: [
            {
                model: Tag,
                as: "tags",
                attributes: ["id", "name"],
                through: {
                    attributes: [],
                },
            },
        ],
    })
        .then((tutorials) => {
            res.send(tutorials)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tutorials."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    return Tutorial.findByPk(id, {
        include: [
            {
                model: Tag,
                as: "tags",
                attributes: ["id", "name"],
                through: {
                    attributes: [],
                },
            },
        ],
    })
        .then((tutorial) => {
            res.send(tutorial)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error " + err + " retrieving Tag with id=" + id
            })
        });
};


