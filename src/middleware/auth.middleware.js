import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynchandeler.js";
import  jwt  from "jsonwebtoken"


export const verifyJWT = asyncHandler(async (req, res, next) => {
    
    try {
        const token = await req.cookies.accessToken //|| req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            
            throw new ApiError(401,'unautorized request')
        }
        
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken)
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        if (!user) {
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401,'Invalid access Token')
    }

})