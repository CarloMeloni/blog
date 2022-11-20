const express = require("express");
const router = express.Router();
const { create, list, read, remove } = require("../controllers/tag");

//VALIDATORS
const { runValidation } = require("../validators");
const { tagCreateValidator } = require("../validators/tag");
const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
} = require("../controllers/auth");

router.post(
  "/tag",
  tagCreateValidator,
  runValidation,
  requireSignin,
  authMiddleware,
  create
);
router.get("/tags", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", requireSignin, authMiddleware, remove);

module.exports = router;
