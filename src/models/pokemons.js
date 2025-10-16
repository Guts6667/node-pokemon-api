module.exports = (sequelize, DataTypes) => {
  // Define the Pokemon model with its attributes and options
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The pokemon name must be unique.",
        },
        validate: {
          notEmpty: {
            msg: "The name field cannot be empty.",
          },
          notNull: {
            msg: "The name field is required.",
          },
          min: {
            args: [3],
            msg: "The name must be at least 3 characters long.",
          },
          max: {
            args: [25],
            msg: "The name must be at most 25 characters long.",
          },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "The value for hp must be an integer",
            notNull: {
              msg: "The hp field is required",
            },
          },
          min: {
            args: [0],
            msg: "The hp must be at least 0.",
          },
          max: {
            args: [999],
            msg: "The hp must be at most 999.",
          },
        },
        cp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            isInt: {
              msg: "The value for cp must be an integer",
              notNull: {
                msg: "The cp field is required",
              },
            },
            min: {
              args: [0],
              msg: "The cp must be at least 0.",
            },
            max: {
              args: [99],
              msg: "The cp must be at most 99.",
            },
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "The picture field must be a valid URL.",
          },
          notNull: {
            msg: "The picture field is required.",
          },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          // Transforme la chaîne de caractères en tableau en se basant sur les virgules (,).
          // The split function automatically creates an array from a string based on a separator.
          return this.getDataValue("types").split(",");
        },
        set(types) {
          // Transforme le tableau en chaîne de caractères en se basant sur les virgules (,).
          // The join function automatically creates a string from an array based on a separator.
          this.setDataValue("types", types.join());
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
