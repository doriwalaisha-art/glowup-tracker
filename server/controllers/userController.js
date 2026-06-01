const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);

        if(user){
            res.json({
                _id : user._id,
                username : user.username,
                email : user.email,
                profilePic : user.profilePic,
                bio : user.bio,
                streak : user.streak,
                followers : user.followers,
                following : user.following 
            });
        }else {
            res.status(400).json({message : "User not found"});
        }
    }catch(error){
        console.error('Error fetching user profile:', error);
        res.status(500).json({message : error.message});
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if(user){
            user.username = req.body.username || user.username;
            user.bio = req.body.bio || user.bio;
            user.profilePic = req.body.profilePic || user.profilePic;

            const updatedUser = await user.save();

            res.json({
                _id : updatedUser._id,
                username : updatedUser.username,
                email : updatedUser.email,
                profilePic : updatedUser.profilePic,
                bio : updatedUser.bio,
            });
        }else {
            res.status(400).json({message : "User not found"});
        }
    }catch(error){
        console.error('Error updating user profile:', error);
        res.status(500).json({message : error.message});
    }
};