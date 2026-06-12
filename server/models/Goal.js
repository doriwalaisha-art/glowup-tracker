const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true

    },

    title : {
        type : String,
        required : [true, "Please give your goal Name"],
        trim : true,
        maxLength : [50, "Goal tittle Cannot br more than 100 characters Long"]

    },

    targetValue : {
        type : Number,
        required : [true,"Please provide a target value(eg : 10kg weight loss,5km run)"],
    },

    currentValue : {
        type : Number,
        default : 0

    },

    deadline : {
        type : Date,
        required : [true,"Please provide a deadline for your goal"]

    },

    completed : {
        type : Boolean,
        default : false

    }
},{timestamps : true});

module.exports = mongoose.model("Goal", goalSchema);