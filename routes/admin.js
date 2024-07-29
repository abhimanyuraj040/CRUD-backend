// const { Router } = require("express");
const express = require("express");
const adminMidleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();

router.post("/signup",adminMidleware, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("username = " + username + " password = " + password);

  Admin.create({
    username: username,
    password: password,
  });

  res.json({
    message: "Admin created Successfully",
  });
});

router.post("/courses", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const newCourse = await Course.create({
    title: title,
    description: description,
    imageLink: imageLink,
    price: price,
  });

  console.log(newCourse);

  res.json({
    message: "course added successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMidleware, async (req, res) => {
  const response = await Course.find({});

  res.json({
    courses: response
  })
});

module.exports = router;
