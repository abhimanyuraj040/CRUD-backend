const mongoose = require("mongoose");

//connect to mongodb
mongoose.connect(
  "mongodb+srv://abhiman:7752Abhimanyu@cluster0.pycdoot.mongodb.net/course_selling_app"
);

//Define Schemas
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const User = mongoose.model("user", UserSchema);
const Admin = mongoose.model("admin", AdminSchema);
const Course = mongoose.model("course", CourseSchema);

module.exports = {
  User,
  Admin,
  Course,
};
