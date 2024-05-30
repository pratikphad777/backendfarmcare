import { asyncHandler } from '../utils/asynchandler.utils.js'
import { ApiError } from '../utils/apiError.utils.js'
import { ApiResponce } from '../utils/apiresponce.utils.js'
import { FarmerUser } from '../models/farmeruser.models.js'

const registerfarmer = asyncHandler(async (req, res) => {
    const { farmerName, phoneNo, address, password } = req.body
    console.log(req.body)

    if ([farmerName, phoneNo, password, address].some((field) => field?.trim() == "")) {
        throw new ApiError(400, 'all fields are required')
    }

    if (password.length < 8) {
        throw new ApiError(201,'password is to short')
    }

    if (phoneNo.length!=10) {
        throw new ApiError(201,'password is to short')
    }

    const existance = await FarmerUser.findOne({
        $or:[{phoneNo}]
     })
     
     if (existance) {
         throw new ApiError(401,'user allready present')
     }
    
     const user = await FarmerUser.create({
        farmerName,
        address,
        phoneNo,
        password,
    })


    //remove passoward and refresh token field from responce
    const createduser = await FarmerUser.findById(user._id).select(
        "-password -refreshToken"
    )


    //chake user creation
    if (!createduser) {
        throw new ApiError(202,'something went wrong')
    }


    //return responce
    return res.status(201).json(
        new ApiResponce(200,createduser,'user registerd successfully')
    ) 
})

export{registerfarmer}


   
    