const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    username: {
        type : String,
        required : [true,"Username is required"],
        unique : true,
        trim : true,
        minlength : [3, "Username must be at least 3 characters long"]
    },

    email : {
        type : String,
        required : [true,"Email is required"],
        unique : true,
        lowercase : true,
        match : [/\S+@\S+\.\S+/, "Please use a valid email address"]
    },

    password : {
        type : String,
        required : [true,"Password is required"],
        minlength : [6, "Password must be at least 6 characters long"]
    },

    profilepic : {
        type : String,
        default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },

    bio : {
        type : String,
        maxlength : [160, "Bio cannot be more than 160 characters long"],
        default : "Staring My glowup journey"
    },

    streak : {
        type : Number,
        default : 0
    },
    followers : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
    following : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],

}, {timestamps : true});

userSchema.pre('save', async function(next) {
    if (!this. isModified('password')) {
    return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);