const express = require("express");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const router = express.Router();

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("username = ", username + " password " + password);

  User.create({
    username: username,
    password: password,
  });
  res.json({
    message: "User created Successfully",
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;

  try{
    await User.updateOne({
      username: username
    },{
      "$push": {
        purchasedCourses: courseId
      }

    })
  }

  catch(e){
    console.log(e)
  }

  res.json({
    message: "Purchase complete!"
  })
});

router.get("/courses", async (req, res) => {
  const response = await Course.find({});

  res.json({
    Courses: response
  })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
  const user = await User.findOne({
    username: req.headers.username
  });
  console.log(user.purchasedCourses)
  const courses = await Course.find({
    _id: {
      "$in": user.purchasedCourses
    }
  })
});

module.exports = router;
