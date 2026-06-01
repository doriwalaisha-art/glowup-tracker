const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    title : {
        type : String,
        required : [true, "Plese give your habit a Name"],
        trim : true,
        maxLength : [50, "Habit title cannot be more than 50 characters long"]
    },

    category : {
        type : String,
        required : [true, "Please select a category  for your habit"],
        enum : ["Health", "Productivity", "Learning", "Fitness", "Hobby", "Other"],
        default : "Other"
    },

    completedDates : {
        type : [String],
        default : []
    },

    streaks : {
        type : Number,
        default : 0
    }
}, {timestamps : true});

module.exports = mongoose.model("Habit", habitSchema);