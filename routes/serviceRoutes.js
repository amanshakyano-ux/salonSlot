const express= require("express")
const {authenticate,adminAuth} = require("../middleware/auth")
 const {createService,getSalonServices} = require("../controller/service")
const router = express.Router()

router.post("/create",authenticate,adminAuth,createService)
router.get("/:salonId",getSalonServices)
 


module.exports = router;