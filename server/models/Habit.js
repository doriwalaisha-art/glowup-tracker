const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, "Please give your habit a name"],
        trim: true,
        maxlength: [50, "Habit name cannot exceed 50 characters"]
    },
    category: {
        type: String,
        required: true,
        trim: true, // Removes accidental spaces
        enum: {
            values: ['Fitness', 'Skincare', 'Study', 'Mindset', 'Productivity', 'Other'],
            message: '{VALUE} is not a supported category'
        },
        default: 'Other'
    },
    completedDates: {
        type: [String],
        default: []
    },
    streak: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
