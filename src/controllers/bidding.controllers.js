import { Bid } from "../models/bidd.models.js";
import { asyncHandler } from '../utils/asynchandler.utils.js'
import { ApiError } from '../utils/apiError.utils.js'
import { ApiResponce } from '../utils/apiresponce.utils.js'

const getcurenttraderuser = asyncHandler(async (req, res) => {
    console.log(req.user)
    return res.status(200).json(new ApiResponce(200, req.user, 'current user fetch successfuly'))
    
})

const bid = asyncHandler(async (req, res) => {
    const { traderName,traderId,date,place,farmerName,farmerId, quantity,price,product} = req.body
    console.log(req.body)
    if ([traderName, traderId, date, place,farmerName,farmerId].some((field) => field?.trim() == "")) {
        throw new ApiError(400, 'all fields are required')
    }
    const bidgeneration = await Bid.create({
        traderName,
        traderId,
        date,
        farmerName,
        place,
        farmerId,
        product,
        quantity,
        price
    })

    //return responce
    return res.status(201).json(
        new ApiResponce(200,bidgeneration,'bid registerd successfully')
    ) 

})

const acceptbid = asyncHandler(async (req, res) => {
    console.log(req.user)
    return res.status(200).json(new ApiResponce(200, req.bid, 'bid fetch successfuly'))
    
})

export{bid,getcurenttraderuser,acceptbid}