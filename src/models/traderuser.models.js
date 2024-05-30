import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

const traderUserSchema = new Schema(
    {
        traderName: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            index:true,
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
            trim: true,
            index:true
        },
        apmcName: {
            type: String,
            required: [true, 'APMC Name is required'],
            trim: true,
            index:true
        },
        phoneNo: {
            type: String,
            required: [true, 'Phone No is required'],
            trim: true,
            index: true,
            unique:true
        },
        wearhouceCapacity: {
            type: Number,
            required: [true, 'wearhouse capacity is required'],
            trim: true,
            index:true
        },
        password: {
            type: String,
            required:[true,'Enter password']
        },
        refreshtoken: {
            type:String
        }
    },
    {timeStamps:true}
)

traderUserSchema.methods.isPasswordCorrect = async function (password) {
    // console.log(this.password)
    // console.log(password)
    if (password == this.password) {
        return true
    } else {
        return false
    }
  // return await bcrypt.compare(password,this.password)
}

traderUserSchema.methods.generateAccessToken = function () {
    
    jwt.sign(
        {
            _id: this._id,
            traderName: this.traderName,
            address: this.address,
            apmcName: this.apmcName,
            phoneNo: this.phoneNo,
            wearhouceCapacity:this.wearhouceCapacity
        },
       
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
    //onsole.log('hellow i am heare')
}

traderUserSchema.methods.generateRefrashToken = function () {
    jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}


export const TraderUser = mongoose.model('TraderUser', traderUserSchema); 