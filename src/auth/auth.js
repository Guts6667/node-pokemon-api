const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

// Middleware to authenticate requests using JWT
module.exports = (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // If the header is missing, return 401 Unauthorized
  if (!authHeader) {
    const message = "Authorization header missing";
    return res.status(401).json({ message });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  // Verify the token
  jwt.verify(token, privateKey, (err, decodedToken) => {
    if (err) {
      const message = "Invalid or expired token";
      return res.status(401).json({ message });
    }

    // Token is valid, extract userId
    const userId = decodedToken.userId;

    // If the request body contains a userId, ensure it matches the token's userId
    if (req.body.userId && req.body.user !== userId) {
      const message = "User ID is invalid";
      res.status(401).json({ message });
      // Proceed to the next middleware or route handler
    } else {
      next();
    }
  });
};
