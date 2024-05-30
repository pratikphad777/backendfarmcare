import mongoose, { Schema } from 'mongoose';

const biddingSchema = new Schema(
    {
        traderName:{
            type: String,
            trim: true,
            index: true,
            required:true
        },
        traderId:{
            type: String,
            trim: true,
            index: true,
            required:true
        },
        date:{
            type: String,
            trim: true,
            index: true,
            required:true
        },
        farmerName:{
            type: String,
            trim: true,
            index: true,
            required:true
        },
        farmerId:{
            type: String,
            trim: true,
            index: true,
            required:true
        },
        product:{
            type: String,
            trim: true,
            index: true,
            required:true
        },
        quantity:{
            type: Number,
            trim: true,
            index: true,
            required:true
        },
        price:{
            type: Number,
            trim: true,
            index: true,
            required:true
        },
    },
    {timestamps:true}
);

export const Bid = mongoose.model('Bid', biddingSchema);