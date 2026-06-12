const Habit = require("../models/Habit");
const User = require("../models/User");

exports.createHabit = async (req, res) => {
    try {
        const { title, category } = req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated. Please login again." });
        }
        console.log("Creating habit for user:", req.user._id, "with data:", { title, category });

        const habit = await Habit.create({
            user: req.user._id,
            title,
            category
        });

        res.status(201).json(habit);
    } catch (error) {
        console.error("❌ Create Habit Error:", error); 
        res.status(500).json({ message: error.message });
    }
};


exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({user : req.user._id})
        res.json(habits);
        console.log("Habits retrieved successfully");
    }catch(error) {
        res.status(500).json({message : error.message});
    }
};

exports.toggleHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: "Habit not found" });

        const today = new Date().toISOString().split('T')[0];

        if (habit.completedDates.includes(today)) {
            
            habit.completedDates = habit.completedDates.filter(date => date !== today);
            habit.streak = Math.max(0, Number(habit.streak || 0) - 1);
            
            
            await User.findByIdAndUpdate(req.user._id, { 
                $inc: { streak: -1 } 
            });
        } else {
            
            habit.completedDates.push(today);
            habit.streak = Number(habit.streak || 0) + 1;
            
            await User.findByIdAndUpdate(req.user._id, { 
                $inc: { streak: 1 } 
            });
        }

        await habit.save();
        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.deleteHabit = async (req,res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if(!habit) {
            return res.status(404).json({message : "Habit not found"});
        }

        if(habit.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({message : "not authorized to delete this habit"})
        }
        await habit.deleteOne();
        res.json({message : "Habit deleted successfully"});
        console.log("Habit deleted successfully");

    }catch(error) {
        res.status(500).json({message : error.message});
    }
};