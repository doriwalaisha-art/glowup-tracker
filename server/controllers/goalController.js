const Goal = require("../models/Goal");

exports.createGoal = async (req, res) => {
    try {
        const { title, targetValue, deadline } = req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const goal = await Goal.create({
            user: req.user._id,
            title,
            targetValue: Number(targetValue), 
            deadline
        });

        res.status(201).json(goal);
    } catch (error) {
        console.error("Create Goal Error:", error); 
        res.status(500).json({ message: error.message });
    }
};


exports.getGoals =  async (req, res) => {
    try{
        const goals = await Goal.find({user : req.user._id});
        res.json(goals);
        console.log("Goals retrieved successfully");
    }catch(error) {
        res.status(500).json({message : error.message});;
    }
};

exports.updateGoals = async (req, res) => {
    try{
        const goal = await Goal.findById(req.params.id);
        if(!goal) {
            return res.status(404).json({message : "Goal not found"})
        }

        if(goal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({message : "Not authorized"})
        }

        goal.title = req.body.title || goal.title ; 
        goal.currentValue = req.body.currentValue !== undefined ? req.body.currentValue : goal.currentValue;
        goal.targetValue = req.body.targetValue || goal.targetValue;
        goal.deadLine = req.body.deadLine || goal.deadLine;

        if (goal.currentValue >= goal.targetValue) {
            goal.completed = true;
        }
        await goal.save();
        res.json(goal);
        console.log("Goal updated successfully");
    }catch(error) {
        res.status(500).json({message : error.message});
    }
}

exports.deleteGoal = async (req, res) => {
    try{
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({message : "Goal not found"});
        }
        if(goal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({message : "not authorized"});
        }
        await goal.deleteOne();
        res.json({message : "Goal deleted successfully"});
        console.log("Goal deleted successfully");
    }catch(error) {
        res.status(500).json({message : error.message});
    }
}