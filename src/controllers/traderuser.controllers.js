import { asyncHandler } from '../utils/asynchandler.utils.js'
import { ApiError } from '../utils/apiError.utils.js'
import { ApiResponce } from '../utils/apiresponce.utils.js'
import { TraderUser } from '../models/traderuser.models.js'


const generateAccessAndRefreshTokens = async (userId)=>{
    try {
        const user = await TraderUser.findById(userId)
       
        const accessToken = user.generateAccessToken();
        //console.log('heare')
        const refreshToken = user.generateRefrashToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        
        return { accessToken, refreshToken }
        
        //user.accessToken = accessToken
    } catch (error) {
        throw new ApiError(500,'somthing went wrong while generating refresh and access token')
    }
}

const registertrader = asyncHandler(async (req, res) => {
    const { traderName, phoneNo, address, password,wearhouceCapacity,apmcName } = req.body
    console.log(req.body)

    if ([traderName, phoneNo, password, address,apmcName].some((field) => field?.trim() == "")) {
        throw new ApiError(400, 'all fields are required')
    }

    if (password.length < 8) {
        throw new ApiError(201,'password is to short')
    }

    if (phoneNo.length!=10) {
        throw new ApiError(201,'password is to short')
    }

    const existance = await TraderUser.findOne({
        $or:[{phoneNo}]
     })
     
     if (existance) {
         throw new ApiError(401,'user allready present')
     }
    
     const user = await TraderUser.create({
        traderName,
        address,
        phoneNo,
        password,
         apmcName,
        wearhouceCapacity,
    })


    //remove passoward and refresh token field from responce
    const createduser = await TraderUser.findById(user._id).select(
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

const loginUser = asyncHandler(async (req, res) => {
    
    //get data from req body
    const { phoneNo, password } = req.body;
    

    //login using email or username
    if (!phoneNo) {
        throw new ApiError(201,'username or email is required')
    }

    //find the user
    const user = await TraderUser.findOne({
        $or: [
            { phoneNo }, 
        ]
    })
    if (!user) {
        throw new ApiError(404,'user not fonded')
    }

    //password chake
    const isPassowardValid = await user.isPasswordCorrect(password);
    console.log(isPassowardValid)

    if (!isPassowardValid) {
        throw new ApiError(404,'password is Invalid')
    }


    //access and generate token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedUser = await TraderUser.findById(user._id).select("-password -refreshToken")


    //send cookiie
    const option = {
        httpOnly: true,
        secure:true
    }

    return res.status(200).cookie("accessToken", accessToken, option).cookie("refreshToken", refreshToken, option).json(
        new ApiResponce(200,
        {
            user:loggedUser,accessToken,refreshToken
        },
            "user logged in successfully")
    )
    
})


export{registertrader,loginUser}


   
    