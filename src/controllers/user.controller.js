import { asynchandler } from "../utils/asynchandler.js";
import { upload } from "../middlewares/multer.middleware.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asynchandler( async (req, res) => {
    //get user details from frontend
    //validation
    //check if user already exists: username and email
    //Check for images, check for avatar
    //upload them to cloudinary, avatar 
    //create user object -- create entry in DB
    //remove password and refresh token field from response
    //check for user creation
    //return response

    const {
        fullname, email, username, password
    } = req.body
    console.log("email:", email);

    if(
        [fullname, email, username, password].some((field) => field?.trim() === "")  
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username } , { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User already Exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

})

export {registerUser}
 