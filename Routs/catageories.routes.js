module.exports = app => {
    const tutorials = require('../Controller/category.controller');
  
    var router = require("express").Router();
  
    // Create a new categories
    router.post("/upload", tutorials.create);//done
  
    // Retrieve all Parent Categories
    router.get("/", tutorials.findAll);  //done

    //Retrive Sub Catagories
    router.get("/iParentCatID/:iParentCatID",tutorials.findParentId)  //done
  
    // Update a Tutorial with id
    router.put("/:cId", tutorials.update);//remain
  
    // Delete a Tutorial with id
    router.delete("/:cId", tutorials.delete);  //done
  
    app.use('/api/category', router);
};

// remaining only image