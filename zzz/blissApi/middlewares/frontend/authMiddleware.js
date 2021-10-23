const jwt = require('jsonwebtoken');
// models
const UserModel = require('../../models/User');
const CONFIG = require('../../config.json')


exports.authMiddleware = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
) {
    return res.status(200).json({
      status:401,
        success:false,
        message: "Please provide the token",
    });
}
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, CONFIG.FRONTEND_JWT_SECRET);
    // req.userId = decoded.userId;
    const user =await  UserModel.findById(decoded._id)
    if(!user)   return res.status(200).json({status:401, success: false, message: "user not found with provided token!!" });
    req._user=user
    return next();
  } catch (error) {
    return res.status(200).json({status:401, success: false, message: error.message });
  }
}