import mongoose, {Schema} from "mongoose";

const farmerUserSchema= new Schema(
    {
        farmerName: {
            type: String,
            required: [true,'Name is required'],
            trim: true,
            index:true
        },
        address: {
            type: String,
            required: [true,'Address is required'],
            trim: true,
            index:true
        },
        phoneNo: {
            type: String,
            required: [true,'Phone No is required'],
            unique: true,
            trim: true,
            index:true,
        },
        password: {
            type: String,
            required:[true,'password is required']
        },
        refreshtoken: {
            type:String
        }
},
    { timestamps: true },
)

export const FarmerUser = mongoose.model('FarmerUser',farmerUserSchema)