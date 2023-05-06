const Tutorial = require('../Modual/blog.modual');

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
     cId : req.body.cId,
     iParentCatID : req.body.iParentCatID,
     vBlogTitle: req.body.vBlogTitle,
     vBlogDescription : req.body.vBlogDescription,
     vBlogFeatureImage : req.body.vBlogFeatureImage,
     vBlogThumbnailImage : req.body.vBlogThumbnailImage,
     tCreatedDate : req.body.tCreatedDate,
     tUpdatedDate : req.body.tUpdatedDate,
  });

// POST

  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Categories."
      });
    else res.send(data);
  });
};

// GET all  categories

exports.findAll = (req, res) => {
  const title = req.query.title;

  Tutorial.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categories."
      });
    else res.send(data);
  });
};

//GET sub category

exports.findId = (req, res) => {
    Tutorial.findId(req.params.bId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found blog with id ${req.params.bId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving blog with bId " + req.params.bId
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
    req.params.bId,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found blog with id ${req.params.bId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating blog with id " + req.params.bId
          });
        }
      } else res.send(data);
    }
  );
};

// DELETE Tutorial 

exports.delete = (req, res) => {
  Tutorial.remove(req.params.bId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found blog with id ${req.params.bId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete blog with id " + req.params.bId
        });
      }
    } else res.send({ message: `blog was deleted successfully!` });
  });
};