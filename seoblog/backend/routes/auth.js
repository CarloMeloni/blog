const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin,
  forgotPassword, 
  resetPassword
} = require("../controllers/auth");

//VALIDATORS
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.post("/signout", signout);
router.put("/forgot-password", forgotPasswordValidator, runValidation, forgotPassword);
router.put("/reset-password", resetPasswordValidator, runValidation, resetPassword);

//TEST
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = router;
