const express= require("express")
const {authenticate} = require("../middleware/auth")
const {loginUser,signupUser}  = require("../controller/auth")
const router = express.Router()

router.post("/signup",signupUser)
router.post("/login",loginUser)


module.exports = router;