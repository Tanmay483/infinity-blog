const sql = require('../config/db');

// constructor
const Tutorial = function (tutorial) {

    this.cId = tutorial.cId;
    this.iParentCatID = tutorial.iParentCatID;
    this.vBlogTitle = tutorial.vBlogTitle;
    this.vBlogDescription = tutorial.vBlogDescription;
    this.vBlogFeatureImage = tutorial.vBlogFeatureImage;
    this.vBlogThumbnailImage = tutorial.vBlogThumbnailImage;
    this.tCreatedDate = tutorial.tCreatedDate;
    this.tUpdatedDate = tutorial.tUpdatedDate;
};

// POST 

Tutorial.create = (newTutorial, result) => {
    sql.query("INSERT INTO tbl_blogs SET ?", newTutorial, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created categories: ", { bId: res.insertbId, ...newTutorial });
        result(null, { bId: res.insertbId, ...newTutorial });
    });
};



//GET blog by id 

Tutorial.findId = (bId, result) => {
    sql.query(`SELECT * FROM tbl_blogs WHERE bId = ${bId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found blog: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

//GET all

Tutorial.getAll = (title, result) => {
    let query = "SELECT * FROM tbl_blogs ";

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

Tutorial.updateById = (bId, tutorial, result) => {
    sql.query(
        "UPDATE tbl_blogs SET cId=?,iParentCatID=?,vBlogTitle=?,vBlogDescription=?,vBlogFeatureImage=?,vBlogThumbnailImage=?,tCreatedDate=?,tUpdatedDate=? WHERE bId=?",
        [tutorial.cId, tutorial.iParentCatID, tutorial.vBlogTitle,tutorial.vBlogDescription, tutorial.vBlogFeatureImage,tutorial.vBlogThumbnailImage,tutorial.tCreatedDate,tutorial.tUpdatedDate, bId],
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

            console.log("updated categories: ", { bId: bId, ...tutorial });
            result(null, { bId: bId, ...tutorial });
        }
    );
};

// DELET

Tutorial.remove = (bId, result) => {
    sql.query(`DELETE  FROM tbl_blogs WHERE bId = ${bId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted categorie with bId: ", bId);
        result(null, res);
    });
};
module.exports = Tutorial;
// image uplod is the main task & main task is remain