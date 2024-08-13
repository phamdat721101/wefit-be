const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    commenter: { type: String, required: true },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const postSchema = mongoose.Schema({
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    comments: [commentSchema]
});

const profileSchema = mongoose.Schema({
    profile_id: {
      type: String,
      description: "Unique identifier for the user profile.",
      unique: true
    },
    username: {
      type: String,
      required: true,
      description: "Unique username chosen by the user.",
    },
    management_fee:{
        type: Number
    },
    email: {
      type: String,
      required: true,
      description: "Email address of the user."
    },    
    bio: {
      type: String,
      description: "Brief biography or description of the user."
    },
    profile_picture_url: {
      type: String,
      description: "URL to the user's profile picture."
    },    
    wallet_address: {
      type: String,
      required: true,
      description: "Cryptocurrency wallet address associated with the user."
    },
    asset_portfolio: [
        {
            asset_id: { 
                type:String, 
                description: "Unique identifier for the asset." 
            },
            amount: { 
                type: Number, 
                description: "number of asset" 
            },
            asset_type: { 
                type:String, 
                description: "Type of asset." 
            }            
        }   
    ],
    transaction_history: [
        {
            transaction_id: {
                type: String,
                description: "Unique identifier for the transaction." 
            },
            date: {
                type: String,
                description: "Unique identifier for the transaction." 
            },
            transaction_type: {
                type: String,
                description: "Unique identifier for the transaction." 
            },
            status: {
                type: String,
                description: "Unique identifier for the transaction." 
            }
        }
    ],
    followers: [
        {
            name:{
                type: String,
                default: "dgt_v1"
            }
        }
    ],
    following: [
        {
            name:{
                type: String,
                default: "dgt_v1"
            }
        }
    ],
    posts: [postSchema],
    created_at: {
      type: Number,
      required: true,
      description: "Timestamp of when the user profile was created."
    },
    updated_at: {
      type: Number,
      required: true,
      description: "Timestamp of the last update to the user profile."
    }
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = { Profile };
