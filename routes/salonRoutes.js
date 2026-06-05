const express= require("express")
const {authenticate,adminAuth} = require("../middleware/auth")
const {loginUser,signupUser}  = require("../controller/auth")
const{createSalon} = require("../controller/salon")
const router = express.Router()

router.post("/create",authenticate,adminAuth,createSalon)
 


module.exports = router;