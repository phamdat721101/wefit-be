const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true, // Ensure user_id is unique
        default: uuidv4, // Generate UUID by default
        index: true,  // Create an index on user_id
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        default: "dgt_investor"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        name: {
            type: String,
            trim: true
        },
        bio: {
            type: String,
            trim: true
        },
        avatarUrl: {
            type: String,
            trim: true
        }
    },
    followers:[
        {
            name: {
                type: String,
                trim: true
            },
            avatarUrl: {
                type: String,
                trim: true
            },
            profile_id:{
                type: String,
                trim: true
            }
        }
    ],
    socialLinks: {
        twitter: {
            type: String,
            trim: true
        }               
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
