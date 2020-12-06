const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  /* Because we are pulling the token out of the header with two parts, the first
  part being the word Bearer for the case of the tutorial but other cases you can use
  whatever method suites you, then we need to first split the header after the word
  that is accompanying the token inside of the header at the white space and then we
  need to retrieve the second index item which is in the 1 position because indexes start
  at 0. */
 try {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(
    token,
    process.env.JWT
    );
    req.userData = { email: decodedToken.email, userId: decodedToken.userId }
    next();
 }  catch(error) {
  res.status(401).json({ message: "Request failed, You are not authenticated!"})
 }
};
