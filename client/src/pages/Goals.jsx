import { useState } from "react";
import { motion } from 'framer-motion';
import { useGoals } from "../hooks/useGoals";
import GoalCard from "../components/GoalCard";
import Input from '../components/Input';
import Button from "../components/Button";
import {useNavigate} from 'react-router-dom';

const Goals = () => {
    const { goals, isLoading, createGoal, updateGoal, deleteGoal} = useGoals();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({title : '' , targetvalue : '', deadline : ''});

    if (isLoading) return <div className="h-screen flex items-center justify-center text-purple-600 font-bold">Loading Goals... </div>;

    const handleSubmit = (e) => {
        e.preventDefault();
        createGoal(formData);
        setShowModal(false);
        setFormData({title: '' , targetvalue : '', deadline:''});
    };

    return(
        <div className = "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6 flex flex-col items-center">
            <button onClick={() => navigate('/dashboard')} className="mb-8 text-sm font-semibold text-slate-500 hover:text-purple-600">
                ← Back to Dashboard
            </button>

            <div className="w-full max-w-2xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black text-slate-800">My Goals 🎯</h1>
                    <button onClick={() => setShowModal(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-indigo-700 transition-all">
                        + New Goal
                    </button>
                </div>

                 <div className="grid gap-6">
                    {goals?.length > 0 ? (
                        goals.map(goal => (
                            <GoalCard 
                                key={goal._id} 
                                goal={goal} 
                                onUpdate={updateGoal} 
                                onDelete={deleteGoal} 
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 text-slate-400 italic">
                            No goals yet. What do you want to achieve? 🌸
                        </div>
                    )}
                </div>
            </div>

             {showModal && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-8 rounded-[30px] shadow-2xl w-full max-w-md border border-slate-100"
                    >
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Set a New Goal ✨</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input label="Goal Title" name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Read 10 Books" />
                            <Input label="Target Value" name="targetValue" type="number" value={formData.targetValue} onChange={(e) => setFormData({...formData, targetValue: e.target.value})} placeholder="e.g. 10" />
                            <Input label="Deadline" name="deadline" type="date" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} />
                            
                            <div className="flex gap-3 mt-6">
                                <Button type="button" onClick={() => setShowModal(false)} className="bg-slate-200 text-slate-600">Cancel</Button>
                                <Button type="submit">Create Goal</Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

        </div>

    );
}

export default Goals;