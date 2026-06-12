import { motion } from  'framer-motion';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const GoalCard = ({ goal , onUpdate, onDelete}) => {
    //calculate progrees pr%
    const progress = Math.min(Math.round((goal.currentValue / goal.targetValue) * 100), 100);

    return (
        <motion.div
            whileHover={{ scale : 1.01 }}
            className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm flex flex-col gap-4 transition-all"
        >
            <div className="flex justify-between items-start">
                <div >
                    <h3 className={`font-bold text-slate-800 ${goal.completed ? 'line-through text=slate-400' : ''}`}>{goal.title}</h3>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                        Deadline : {new Date(goal.deadline).toLocaleDateString()}
                    </p>
                </div>
                <button onClick={() => onDelete(goal._id)} className="text-slate-300 hover:text-red-500 transition-colors">
                    <FiTrash2 size={18} />
                </button>
            </div>

         {/* progress bar section */}
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>progress : {goal.currentValue} / {goal.targetValue}</span>
                <span>{progress}%</span>
            </div>

            <div className = "w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                    initial = {{ width : 0}}
                    animate = {{ width : `${progress}%`}}
                    className={`h-full ${goal.completed ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}
                />
            </div>
        </div>

         <div className="flex justify-center gap-4 mt-2">
                <button 
                    onClick={() => onUpdate({ id: goal._id, updatedData: { currentValue: Math.max(0, goal.currentValue - 1) }})}
                    className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                    <FiMinus />
                </button>
                <button 
                    onClick={() => {
                        if (goal.currentValue < goal.targetValue) {
                        onUpdate({ id: goal._id, updatedData: { currentValue: goal.currentValue + 1 }});
                    }
                }}
                    className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                >
                    <FiPlus />
                </button>
            </div>

        </motion.div>
    );
};

export default GoalCard;