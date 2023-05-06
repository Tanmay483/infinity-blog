const sql = require('../config/db');
const jwt = require('jsonwebtoken')

// constructor
const Tutorial = function (tutorial) {

  this.vFirstName = tutorial.vFirstName;
  this.vLastName = tutorial.vLastName;
  this.vEmailId = tutorial.vEmailId;
  this.vMobileNumber = tutorial.vMobileNumber;
  this.tCreatedDate = tutorial.tCreatedDate;
  this.tUpdatedDate = tutorial.tUpdatedDate;
  this.vUserName = tutorial.vUserName;
  this.vPassword = tutorial.vPassword
};

// POST 

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO tbl_users SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { uId: res.insertuId, ...newTutorial });
    result(null, { uId: res.insertuId, ...newTutorial });
  });
};

// GET by ID

Tutorial.findById = (uId, result) => {
  sql.query(`SELECT * FROM tbl_users WHERE uId = ${uId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

//GET All

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM tbl_users";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

//PUT

Tutorial.updateById = (uId, tutorial, result) => {
  sql.query(
    "UPDATE tbl_users SET vUserName=?,vFirstName=?,vLastName=?,vEmailId=?,vPassword=?,vMobileNumber=?,tCreatedDate=?,tUpdatedDate=? WHERE uId=?",
    [tutorial.vUserName, tutorial.vFirstName, tutorial.vLastName, tutorial.vEmailId, tutorial.vPassword, tutorial.vMobileNumber, tutorial.tCreatedDate, tutorial.tUpdatedDate, uId],
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

      console.log("updated tutorial: ", { uId: uId, ...tutorial });
      result(null, { uId: uId, ...tutorial });
    }
  );
};

// DELET

Tutorial.remove = (uId, result) => {
  sql.query(`DELETE  FROM tbl_users WHERE uId = ${uId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with uId: ", uId);
    result(null, res);
  });
};



module.exports = Tutorial;
