const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


  const checkToken = asyncHandler(async (req, res, next) => {
    const authcookie = req.cookies.jwt
    
    if (!authcookie) {
        res.status(401).send("Invalid Token");
    }
  
    jwt.verify(authcookie, process.env.Access_Token, (err, authData) => {
        if (err) {
            res.status(401).send("Invalid Token")
        } else {
            req.authData = authData
            next();
        }
    });
  });

module.exports = checkToken;
