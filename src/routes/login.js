const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      // Check if user exists
      .then((user) => {
        // If user not found, return 404
        if (!user) {
          const message = "User not found. Please check your username.";
          return res.status(404).json({ message });
        }
        // Compare provided password with stored hashed password
        bcrypt.compare(req.body.password, user.password);
      })
      // Check if password is valid
      .then((isPasswordValid) => {
        // If password is invalid, return 401
        if (!isPasswordValid) {
          const message = "Invalid password. Please try again.";
          return res.status(401).json({ message });
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, privateKey, {
          expiresIn: "24h",
        });
        // Return success message with user data and token
        const message = `User ${req.body.username} successfully logged in.`;
        res.json({ message, data: user, token });
      })
      // Handle any errors during the process
      .catch((error) => {
        const message = "An error occurred during login. Please try again.";
        res.status(500).json({ message, data: error });
      });
  });
};
