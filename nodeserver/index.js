// IMPORTS
const express = require("express");
const app = express();
const {
  sequelize,
  User,
  Volunteer,
  Doctor,
  Activity,
  Issue,
  IssueActivity,
  UserActivity
} = require("./db.js");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//Run Initialize DB when you make changes in the model
const initializeDB = async () => {
  await sequelize.sync();
  const doctor = await Doctor.create({
    firstName: "Rabeeh",
    lastName: "Thufayil",
    phone: "9987634154"
  });

  const volunteer = await Volunteer.create({
    firstName: "Jose",
    lastName: "V",
    phone: "9987634154"
  });

  const user = await User.create({
    firstName: "Ann",
    lastName: "Vithayathil",
    phone: "9987634154",
    doctorId: doctor.dataValues.id,
    volunteerId: volunteer.dataValues.id
  });

  const activity = await Activity.create({
    activity: "Get more sleep"
  });

  const issue = await Issue.create({
    name: "Anxiety"
  });

  const issueActivity = await IssueActivity.create({
    issueId: issue.dataValues.id,
    activityId: activity.dataValues.id
  });

  const userActivity = await UserActivity.create({
    activityId: activity.dataValues.id,
    userId: user.dataValues.id,
    status: 0
  });
};

const logUser = async userType => {
  var user;
  switch (userType) {
    case 0:
      user = await User.findOne({
        where: {
          id: 1
        }
      });
      break;
    case 1:
      user = await Volunteer.findOne({
        where: {
          id: 1
        }
      });
      break;
    case 2:
      user = await Doctor.findOne({
        where: {
          id: 1
        }
      });
      break;
  }
  return user.dataValues;
};

// initializeDB();

// ROUTES
app.get("/", async (req, res) => {
  var user = await logUser(0);
  res.render("pages/index", {
    name: user.firstName + " " + user.lastName
  });
});

app.get("/dashboard/user", async (req, res) => {
  const user = await logUser(0);
  const useractivity = await UserActivity.findAll({
    where: {
      userId: user.id
    }
  });

  var activities = [];
  for (var i = 0; i < useractivity.length; i++) {
    const result = await Activity.findOne({
      where: {
        id: useractivity[i].activityId
      }
    });
    activities.push(result.dataValues.activity);
  }

  res.render("pages/dashboard_user", {
    name: user.firstName + " " + user.lastName,
    activities: activities
  });
});

app.get("/dashboard/user/medicines", async (req, res) => {
  const user = await logUser(2);

  res.render("pages/user_medicines", {
    name: user.firstName + " " + user.lastName,
  });
});

app.get("/dashboard/doctor", async (req, res) => {
    const user = await logUser(2);
  
    res.render("pages/dashboard_doctor", {
      name: user.firstName + " " + user.lastName,
    });
  });

  app.get("/dashboard/history", async (req, res) => {
    const user = await logUser(2);
  
    res.render("pages/dashboard_history", {
      name: user.firstName + " " + user.lastName,
    });
  });

  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
