module.exports = app => {
    const tutorials = require('../Controller/system.controller');
  
    var router = require("express").Router();
  
    // Create a new blog
    router.post("/", tutorials.create);
  
    // Retrieve all blog
    router.get("/", tutorials.findAll);  

    //Retrive blog by id
    router.get("/:sId",tutorials.findOne)  
  
    // Update a blog with id
    router.put("/:sId", tutorials.update);
  
    // Delete a blog with id
    router.delete("/:sId", tutorials.delete);  
  
    app.use('/system', router);
};