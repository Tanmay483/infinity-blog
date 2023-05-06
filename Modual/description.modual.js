const sql = require('../config/db');

// constructor
const Tutorial = function (tutorial) {

  this.bId = tutorial.bId;
  this.vBlogDescription	 = tutorial.vBlogDescription;
  this.vBlogImage = tutorial.vBlogImage;
  this.tCreatedDate = tutorial.tCreatedDate;
  this.tUpdatedDate = tutorial.tUpdatedDate;
};

// POST 

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO tbl_additional_blogs_desc SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { abId: res.insertabId, ...newTutorial });
    result(null, { abId: res.insertabId, ...newTutorial });
  });
};

// GET by ID

Tutorial.findById = (bId, result) => {
  sql.query(`SELECT * FROM tbl_additional_blogs_desc WHERE bId = ${bId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found description: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

//GET All

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM tbl_additional_blogs_desc";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("description: ", res);
    result(null, res);
  });
};

//PUT

Tutorial.updateById = (abId, tutorial, result) => {
  sql.query(
    "UPDATE tbl_additional_blogs_desc SET bId=?,vBlogDescription=?,vBlogImage=?,tCreatedDate=?,tUpdatedDate=? WHERE abId=?",
    [tutorial.bId, tutorial.vBlogDescription, tutorial.vBlogImage,tutorial.tCreatedDate, tutorial.tUpdatedDate, abId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated description: ", { abId: abId, ...tutorial });
      result(null, { abId: abId, ...tutorial });
    }
  );
};

// DELET

Tutorial.remove = (abId, result) => {
  sql.query(`DELETE  FROM tbl_additional_blogs_desc WHERE abId = ${abId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted description with Id: ", abId);
    result(null, res);
  });
};



module.exports = Tutorial;
