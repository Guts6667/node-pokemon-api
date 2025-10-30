module.exports = (sequelize, DataTypes) => {
  // Define the User model with its attributes and options
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The username must be unique.",
        },
        validate: {
          notEmpty: {
            msg: "The username field cannot be empty.",
          },
          notNull: {
            msg: "The username field is required.",
          },
          len: {
            args: [3, 25],
            msg: "The username must be between 3 and 25 characters long.",
          },
        },
      },
      // email: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   unique: {
      //     msg: "The email must be unique.",
      //   },
      //   validate: {
      //     isEmail: {
      //       msg: "The email format is invalid.",
      //     },
      //     notNull: {
      //       msg: "The email field is required.",
      //     },
      //   },
      // },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "The password field cannot be empty.",
          },
          notNull: {
            msg: "The password field is required.",
          },
          len: {
            args: [6, 100],
            msg: "The password must be between 6 and 100 characters long.",
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};
