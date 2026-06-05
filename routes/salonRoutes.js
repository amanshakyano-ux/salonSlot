const express= require("express")
const {authenticate,adminAuth} = require("../middleware/auth")
const {loginUser,signupUser}  = require("../controller/auth")
const{createSalon,searchSalons} = require("../controller/salon")
const router = express.Router()

router.post("/create",authenticate,adminAuth,createSalon)
router.get("/search",searchSalons)



module.exports = router;