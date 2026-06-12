import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../hooks/useProfile';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { profile, isLoading, updateProfile, isUpdating } = useProfile();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ username: '', bio: '' });

    if (isLoading || !profile) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-medium">
                Loading Profile... ✨
            </div>
        );
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setFormData({ 
            username: profile?.username || '', 
            bio: profile?.bio || '' 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(formData); 
            setIsEditing(false);
        } catch (error) {
            console.log(error)
            alert("Failed to update profile");
        }
    };

    return (
        
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-purple-50 to-rose-50 p-6 flex flex-col items-center justify-center">
            
            <button 
                onClick={() => navigate('/dashboard')} 
                className="mb-8 text-sm font-semibold text-slate-500 hover:text-purple-600 transition-colors"
            >
                ← Back to Dashboard
            </button>

            {/* CLEAN GLASSMORPHISM: Brighter white, softer blur */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-md p-10 rounded-[40px] shadow-xl border border-white/50 w-full max-w-lg text-center"
            >
                <div className="relative w-32 h-32 mx-auto mb-6">
                    <img 
                        src={profile?.profilePic} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div className="absolute bottom-1 right-1 bg-white text-purple-600 text-[10px] px-2 py-1 rounded-full shadow-sm border border-purple-100 font-bold uppercase tracking-tighter">
                        Active ✨
                    </div>
                </div>

                {!isEditing ? (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-800">{profile?.username}</h2>
                        <p className="text-slate-500 italic font-medium max-w-xs mx-auto">"{profile?.bio || "Start your journey..."}"</p>
                        
                        {/* MINIMAL STATS BOX */}
                        <div className="flex justify-around py-6 bg-white/50 rounded-3xl mt-8 border border-white/50 shadow-sm">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-indigo-600">{profile?.streak || 0}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Day Streak</p>
                            </div>
                            <div className="border-l border-slate-200"></div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-rose-500">{profile?.followers?.length || 0}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Followers</p>
                            </div>
                        </div>

                        <Button onClick={handleEditToggle} className="mt-8 bg-slate-800 hover:bg-slate-900 text-white py-3">
                            Edit Profile
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="text-left space-y-4">
                        <Input 
                            label="Username" 
                            name="username" 
                            value={formData.username} 
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            placeholder="Enter new username"
                        />
                        <Input 
                            label="Bio" 
                            name="bio" 
                            value={formData.bio} 
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            placeholder="Enter your glow-up mantra"
                        />
                        <div className="flex gap-3 mt-8">
                            <Button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 text-slate-600 hover:bg-slate-300">Cancel</Button>
                            <Button type="submit" className={isUpdating ? "opacity-50" : ""}>
                                {isUpdating ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Profile;
