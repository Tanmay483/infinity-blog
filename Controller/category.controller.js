const multer  = require('multer')
const Tutorial = require('../Modual/category.modual');

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
     vCategoryName : req.body.vCategoryName,
     vCategorySlug : req.body.vCategorySlug,
     iParentCatID : req.body.iParentCatID,
     vCategoryImage : req.body.vCategoryImage,
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

exports.findParentId = (req, res) => {
    Tutorial.findParentId(req.params.iParentCatID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Categories with id ${req.params.iParentCatID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Categories with iParentCatID " + req.params.iParentCatID
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
    req.params.cId,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Categories with id ${req.params.cId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Categories with id " + req.params.cId
          });
        }
      } else res.send(data);
    }
  );
};

// DELETE Tutorial 

exports.delete = (req, res) => {
  Tutorial.remove(req.params.cId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Categories with id ${req.params.cId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Categories with id " + req.params.cId
        });
      }
    } else res.send({ message: `Categories was deleted successfully!` });
  });
};

// image controller 

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function(req,file,cb){
//       cb(null,"cat.img")
//     },
//     filename: function(req,file,cb){
//       cb(null,file.fieldname+"-"+ Date.now()+'.png','.gif','.jpg','.jpeg')
//     }
//   })
// }).single("vCategoryImage")