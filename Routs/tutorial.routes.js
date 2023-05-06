module.exports = app => {
    const tutorials = require('../Controller/tutorial.controller');
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/login", tutorials.create);  //one error app exit it self
  
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:uId", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:uId", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:uId", tutorials.delete);
  
    app.use('/api/user', router);
};