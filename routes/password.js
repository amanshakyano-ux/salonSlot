const express = require("express")
const router = express.Router();
const {sendPasswordResetLink,resetPassword} = require("../controller/password")
router.post("/forgot-password", sendPasswordResetLink);
router.patch("/reset-password/:token", resetPassword);
module.exports = router;