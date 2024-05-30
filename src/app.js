import express from 'express';
import cookieParser  from 'cookie-parser'


const app = express();

app.use(express.json({
    limit:'16kb'
}))

app.use(express.urlencoded({
    extended: true,
    limit:'16kb'
}))

app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import { registertrader} from './controllers/traderuser.controllers.js'
import userrouter from './routes/user.routes.js';



//routes declaration
app.use('/api/v1/farmeruser', userRouter)
app.use('/api/v1/traderuser', userRouter)
app.use('/api/v2/bid', userrouter)
app.use('/api/v2/traderlogin', userrouter)
app.use('/api/v2/get_trader', userRouter)
app.use('/api/v2/acceptbid',userRouter)
//app.use('/api/v1/login', userRouter)
 //app.use('/api/v1/logout',userRouter)

export{ app };
