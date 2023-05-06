module.exports = app => {
    const tutorials = require('../Controller/description.controller');
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorials.create);  //one error app exit it self
  
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:abId", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:abId", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:abId", tutorials.delete);
  
    app.use('/description', router);
};