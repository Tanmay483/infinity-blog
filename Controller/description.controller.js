const Tutorial = require('../Modual/description.modual');


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
    bId	:req.body.bId,
    vBlogDescription: req.body.vBlogDescription,
    vBlogImage: req.body.vBlogImage,
    tCreatedDate: req.body.tCreatedDate,
    tUpdatedDate:req.body.tUpdatedDate,
  });

//   // POST

  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the Description."
      });
    else res.send(data);
  });
};

// GET all  

exports.findAll = (req, res) => {
    const title = req.query.title;
  
    Tutorial.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving description."
        });
      else res.send(data);
    });
  };

// GET by Id

exports.findOne = (req, res) => {
  Tutorial.findById(req.params.abId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Description with id ${req.params.abId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving description with id " + req.params.abId
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
    req.params.abId,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found description with id ${req.params.abId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating description with id " + req.params.abId
          });
        }
      } else res.send(data);
    }
  );
};

// DELETE Tutorial 

exports.delete = (req, res) => {
  Tutorial.remove(req.params.abId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.abId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.abId
        });
      }
    } else res.send({ message: `Description was deleted successfully!` });
  });
};