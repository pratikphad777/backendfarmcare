import { Router } from 'express'
import { registertrader,loginUser } from '../controllers/traderuser.controllers.js'
import { registerfarmer } from '../controllers/farmeruser.controllers.js'
import { bid, getcurenttraderuser,acceptbid } from '../controllers/bidding.controllers.js'
//import { upload } from '../middlewares/multer.middlewares.js'
//import { verifyJWT } from '../middlewares/auth.middleware.js'



const userrouter = Router()


userrouter.route('/').post(registerfarmer)
userrouter.route('/traderuser').post(registertrader)
userrouter.route('/bid').post(bid)
userrouter.route('/traderlogin').post(loginUser)
userrouter.route('/get_trader').get(getcurenttraderuser)
userrouter.route('/acceptbid').get(acceptbid)


// userrouter.route("/login").post(loginUser)

// userrouter.route("/logout").post(verifyJWT ,logoutUser)

export default userrouter