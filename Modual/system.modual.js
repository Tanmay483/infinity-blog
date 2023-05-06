const sql = require('../config/db');

// constructor
const Tutorial = function (tutorial) {

  this.vProjectName = tutorial.vProjectName;
  this.vProjectLogo = tutorial.vProjectLogo;
  this.vProjectLoginPageBgImage = tutorial.vProjectLoginPageBgImage;
  this.vEmail = tutorial.vEmail;
  this.vMobileNumber = tutorial.vMobileNumber;
  this.vAddress	= tutorial.vAddress;
  this.tCreatedDate	 = tutorial.tCreatedDate;
};

// POST 

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO tbl_system SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created system: ", { sId: res.insertsId, ...newTutorial });
    result(null, { sId: res.insertsId, ...newTutorial });
  });
};

// GET by ID

Tutorial.findById = (sId, result) => {
    sql.query(`SELECT * FROM tbl_system WHERE sId = ${sId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found system: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

//GET All

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM tbl_system";

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

Tutorial.updateById = (sId, tutorial, result) => {
  sql.query(
    "UPDATE tbl_system SET vProjectName=?,vProjectLogo=?,vProjectLoginPageBgImage=?,vEmail=?,vMobileNumber=?,vAddress=?,tCreatedDate=? WHERE sId=?",
    [tutorial.vProjectName, tutorial.vProjectLogo, tutorial.vProjectLoginPageBgImage, tutorial.vEmail, tutorial.vMobileNumber, tutorial.vAddress, tutorial.tCreatedDate,sId],
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

      console.log("updated tutorial: ", { sId: sId, ...tutorial });
      result(null, { sId: sId, ...tutorial });
    }
  );
};

// DELET

Tutorial.remove = (sId, result) => {
  sql.query(`DELETE  FROM tbl_system WHERE sId = ${sId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted system with sId: ", sId);
    result(null, res);
  });
};



module.exports = Tutorial;
