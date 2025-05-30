import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new  mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true,  
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            minlength:6, // used for the constraint for minimum length
        },
        bio:{
            type:String,
            default:""
        },
        profilePic :{
            type:String,
            default:"",
        },
        nativeLanguage: {
            type:String,
            default:"",
        },
        learningLanguage:{
            type:String,
            default:"",
        },
        location:{
            type:String,
            default:""
        },
        isOnboarded: {
            type:Boolean,
            default:false,
        },
        friends:[
            {
                type:Schema.Types.ObjectId,
                ref:"User"
            }
        ]
    }
    ,{timestamps:true});   // CreatedAt and UpdatedAt


    userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }
})
 
userSchema.methods.matchPassword = async function (enteredPassword) {
       const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password)
       return isPasswordCorrect;
}

const User = mongoose.model("User", userSchema);

// pre Hook
// john@gmail.com 123456 => hashing unreadable



export default User;