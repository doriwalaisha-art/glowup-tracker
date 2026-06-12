import { useState } from 'react';
import { motion } from 'framer-motion';
import HabitCard from '../components/HabitCard';
import { useHabit } from '../hooks/useHabit';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';


const Habits = () => {
    const { habits , isLoading, createHabit, toggleHabit, deleteHabit} = useHabit();
    const navigate = useNavigate();
    const [showModel,setShowModel] = useState(false);
    const [formData , setFormData] = useState({ title : '', category : 'Fitness'});

    if(isLoading) return <div className="h-screen flex items-center justify-center text-purple-600 font-bold">Loading Habits...</div>

    const handleSubmit = (e) => {
        e.preventDefault();
        createHabit(formData);
        setShowModel(false);
        setFormData({ title : '', category : 'Fitness'});
    };

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-rose-50 p-6 flex flex-col items-center">
            <button onClick={() => navigate('/profile')} className="mb-8 text-sm font-semibold text-slate-500 hover:text-purple-600">
                  ← My Profile
            </button>

            <div className='w-full max-w-2xl '>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black text-slate-800">My Habits</h1>
                    <button onClick={() => setShowModel(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-purple-700 transition-all">
                            + Add Habit
                    </button>
                </div>

                <div className="grid gap-4">
                    {habits?.length > 0 ? (
                        habits.map(habit => (
                            <HabitCard
                                key={habit._id}
                                habit = {habit}
                                onToggle={toggleHabit}
                                onDelete={deleteHabit}
                            />
                        ))

                    ):(
                        <div className="text-center py-20 text-slate-400 italic">
                            no habit yet.Start your glow-up Today! 🌸
                        </div>
                    )}

                </div>
            </div>

            {showModel && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial = {{ opacity: 0, scale : 0.9}}
                        animate = {{ opacity : 1 , scale : 1}}
                        className="bg-white p-8 rounded-[30px] shadow-2xl w-full max-w-md border border-slate-100"
                    >
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">New Habit </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label= "Habit Name"
                                name = "title"
                                value = {formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder="e.g. Drink 2L water"
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1 ml-1">Category</label>
                                <select className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                    <option value="Fitness">Fitness</option>
                                    <option value="Skincare">Skincare</option>
                                    <option value="Study">Study</option>
                                    <option value="Mindset">Mindset</option>
                                    <option value="Productivity">Productivity</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <Button type="button" onClick={() => setShowModel(false)} className="bg-slate-200 text-slate-600">Cancel</Button>
                                <Button type="submit">Add Habit</Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

        </div>
    );
};

export default Habits;