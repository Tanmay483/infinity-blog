const sql = require('../config/db');
const multer = require('multer')

// constructor
const Tutorial = function (tutorial) {

  this.vCategoryName = tutorial.vCategoryName;
  this.vCategorySlug = tutorial.vCategorySlug;
  this.vCategoryImage = tutorial.vCategoryImage;
  this.iParentCatID = tutorial.iParentCatID;
  this.tCreatedDate = tutorial.tCreatedDate;
  this.tUpdatedDate = tutorial.tUpdatedDate;
};

// POST 

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO tbl_categories SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created categories: ", { uId: res.insertcId, ...newTutorial });
    result(null, { cId: res.insertcId, ...newTutorial });
  });
};



//GET sub category 

Tutorial.findParentId = (iParentCatID, result) => {
  sql.query(`SELECT * FROM tbl_categories WHERE iParentCatID = ${iParentCatID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found categorie: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

//GET ParentCatagory

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM tbl_categories WHERE iParentCatID = 0";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Categories: ", res);
    result(null, res);
  });
};

//PUT

Tutorial.updateById = (cId, tutorial, result) => {
  sql.query(
    "UPDATE tbl_categories SET vCategoryName=?,vCategorySlug=?,vCategoryImage=?,iParentCatID=?,tCreatedDate=?,tUpdatedDate=? WHERE cId=?",
    [tutorial.vCategoryName, tutorial.vCategorySlug , tutorial.vCategoryImage, tutorial.iParentCatID, tutorial.tCreatedDate, tutorial.tUpdatedDate, cId],
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

      console.log("updated categories: ", { cId: cId, ...tutorial });
      result(null, { cId: cId, ...tutorial });
    }
  );
};

// DELET

Tutorial.remove = (cId, result) => {
  sql.query(`DELETE  FROM tbl_categories WHERE cId = ${cId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted categorie with cId: ", cId);
    result(null, res);
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

module.exports = Tutorial;



// upload image is remain main task this task is pending