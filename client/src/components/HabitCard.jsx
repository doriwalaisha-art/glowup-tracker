import { motion } from 'framer-motion';
import { FiTrash2, FiCheckCircle, FiCircle } from 'react-icons/fi';

const HabitCard = ({ habit, onToggle, onDelete}) => {
    const isCompletedToday = habit.completedDates?.some(date =>
        date === new Date().toISOString().split('T')[0]
    );

    return (
        <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/60 backdrop-blur-md p-5 rounded-3xl border border-white/50 shadow-sm flex items-center justify-between transition-all"
        >
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => onToggle(habit._id)}
                    className={`text-3xl transition-colors ${isCompletedToday ? 'text-green-500' : 'text-slate-300 hover:text-purple-400'}`}
                >
                    {isCompletedToday ? <FiCheckCircle /> : <FiCircle />}
                </button>
                
                <div>
                    <h3 className={`font-bold text-slate-800 ${isCompletedToday ? 'line-through text-slate-400' : ''}`}>
                        {habit.title}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                        {habit.category}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Streak Flame */}
                <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-orange-600">{habit.streak}</span>
                    <span className="text-xs">🔥</span>
                </div>

                <button 
                    onClick={() => onDelete(habit._id)}
                    className="text-slate-300 hover:text-red-500 transition-colors"
                >
                    <FiTrash2 size={18} />
                </button>
            </div>
        </motion.div>
    );
};

export default HabitCard;
