module.exports = app => {
    const tutorials = require('../Controller/blog.controller');
  
    var router = require("express").Router();
  
    // Create a new blog
    router.post("/", tutorials.create);//done
  
    // Retrieve all blog
    router.get("/", tutorials.findAll);  //done

    //Retrive blog by id
    router.get("/:bId",tutorials.findId)  //done
  
    // Update a blog with id
    router.put("/:bId", tutorials.update);//done
  
    // Delete a blog with id
    router.delete("/:bId", tutorials.delete);  //done
  
    app.use('/blog', router);
};