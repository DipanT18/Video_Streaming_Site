import mongoose, {Mongoose, Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, //We will write Cloudnary URL here
        required: true,
    },
    cover_image: {
        type: String,
    },
    watch_history: [{
        type: Schema.Types.ObjectId,
        ref: "Video" //We will write here later,
    }],
    password: {
        type: String, //We will use encryption later
        required: [true, "Password is required!"],
    },
    refreshToken: {
        type: String,
    },


}, {timestamps: true})

userSchema.pre("save", async function (next) {
    //This is a negative check
    if(!this.isModified("password")) return next(); 

    this.password = bcrypt.hash(this.password, 10) //this 10 is rounds
    next()
});

userSchema.method.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.method.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        }, 
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)