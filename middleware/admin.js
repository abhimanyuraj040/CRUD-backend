const {Admin} = require("../db");

function adminMiddleware(req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;
    Admin.findOne({
      username : username,
      password : password
    })
    .then(function(value){
      if(value){
        console.log("you can go", value);
        next();
      }
      else{
        res.status(403).json({
          msg: "User doesnt exist"
        })
      }
    })
    
  }
  
  module.exports = adminMiddleware; 