const Tutorial = require('../Modual/system.modual');


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
    vProjectName:req.body.vProjectName,
    vProjectLogo: req.body.vProjectLogo,
    vProjectLoginPageBgImage: req.body.vProjectLoginPageBgImage,
    vEmail: req.body.vEmail,
    vMobileNumber:req.body.vMobileNumber,
    vAddress: req.body.vAddress,
    tCreatedDate: req.body.tCreatedDate,
  });

 // POST

  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the system."
      });
    else res.send(data);
  });
};

// GET all  

exports.findAll = (req, res) => {
  const system = req.query.system;

  Tutorial.getAll(system, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving system."
      });
    else res.send(data);
  });
};

// GET by Id

exports.findOne = (req, res) => {
    Tutorial.findById(req.params.sId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found system with id ${req.params.sId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving system with id " + req.params.sId
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
    req.params.sId,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found system with id ${req.params.sId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating system with id " + req.params.sId
          });
        }
      } else res.send(data);
    }
  );
};

// DELETE Tutorial 

exports.delete = (req, res) => {
  Tutorial.remove(req.params.sId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.sId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete system with id " + req.params.sId
        });
      }
    } else res.send({ message: `system was deleted successfully!` });
  });
};