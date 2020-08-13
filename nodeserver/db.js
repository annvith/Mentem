const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mydb2", "root", "password", {
  host: "localhost",
  dialect: "mysql"
});

sequelize
  .authenticate()
  .then(result => {
    console.log("Connection has been established successfully.");
  })
  .catch(error => {
    console.error("Unable to connect to the database:", error);
  });

const User = sequelize.define(
  "user",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true
  }
);

const Volunteer = sequelize.define(
  "volunteer",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true
  }
);

const Doctor = sequelize.define(
  "doctor",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true
  }
);

const Activity = sequelize.define(
  "activities",
  {
    activity: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true
  }
);

const Issue = sequelize.define(
  "issues",
  {
    name: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true
  }
);

const IssueActivity = sequelize.define("issue_activity");
const UserActivity = sequelize.define("user_activity", {
    status: {
        type: DataTypes.INTEGER
    }
});

User.belongsTo(Volunteer);
User.belongsTo(Doctor);
IssueActivity.belongsTo(Activity);
IssueActivity.belongsTo(Issue);
UserActivity.belongsTo(Activity);
UserActivity.belongsTo(User);

module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Doctor = Doctor;
module.exports.Volunteer = Volunteer;
module.exports.Activity = Activity;
module.exports.Issue = Issue;
module.exports.IssueActivity = IssueActivity;
module.exports.UserActivity = UserActivity;
