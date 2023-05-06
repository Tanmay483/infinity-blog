const jwt = require('jsonwebtoken')
const Tutorial = require('../Modual/tutorial.modal');
let scretKey = 'scretKey';

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    vUserName:req.body.vUserName,
    vFirstName: req.body.vFirstName,
    vLastName: req.body.vLastName,
    vEmailId: req.body.vEmailId,
    vPassword:req.body.vPassword,
    vMobileNumber: req.body.vMobileNumber,
    tCreatedDate: req.body.tCreatedDate,
    tUpdatedDate: req.body.tUpdatedDate
  });

//   // POST

  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
  jwt.sign({ tutorial }, scretKey, { expiresIn: '300s' }, (err, token) => {
    res.json({
      token
    })
  })
};

// GET all  

exports.findAll = (req, res) => {
  const title = req.query.title;

  Tutorial.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// GET by Id

exports.findOne = (req, res) => {
  Tutorial.findById(req.params.uId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.uId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.uId
        });
      }
    } else res.send(data);
  });
};


// PUT 

exports.update = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Tutorial.updateById(
    req.params.uId,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.uId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.uId
          });
        }
      } else res.send(data);
    }
  );
};

// DELETE Tutorial 

exports.delete = (req, res) => {
  Tutorial.remove(req.params.uId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.uId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.uId
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};