import { motion } from 'framer-motion';
import { useNavigate} from 'react-router-dom';
import { useDashboard } from  '../hooks/useDashboard';
import { FiTarget, FiArrowRight } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

const Dashboard = () => {
    const { user, habits, goals, isLoading } = useDashboard();
    const navigate = useNavigate();

    if (isLoading) return <div className="h-screen flex item-center justify-center text-purple-600 font-bold">Loading Your Glow-up...</div>

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-rose-50 p-6">
            {/* HEADER SECTION */}
            <header className="max-w-6xl mx-auto flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Helloo , {user?.username}!</h1>
                    <p className="text-slate-500 font-medium">Ready to crush your goal today ?</p>
                </div>

                <div 
                    onClick={() => navigate('/profile')}
                    className="cursor-pointer group relative"
                >
                     <img src={user?.profilePic} alt="profile" className="w-12 h-12 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* MAIN STREAK CARD (Large) */}
                <motion.div
                initial = {{opacity : 0 , y : 20}} animate = {{opacity : 1 , y : 0}}
                className = "md:col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-[40px] text-white shadow-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-medium opacity-90">Current Streak</h2>
                        <p className="text-6xl font-black mt-2">{user?.streak || 0} <span className="text-2xl font-normal opacity-80">Days</span></p>
                        <p className="mt-4 text-sm opacity-80">Keep the movement going! Don't let the flame die.</p>
                    </div>
                    <div className="text-7xl animate-bounce">🔥</div>
                </motion.div>

                
                {/* QUICK ACTION CARD */}

                <motion.div
                    initial = {{ opacity : 0 , y : 20}} animate = {{ opacity : 1, y : 0}} transition = {{ delay : 0.1}}
                    className="bg-white/60 backdrop-blur-md p-8 rounded-[40px] border border-white/50 shadow-xl flex flex-col justify-center items-center text-center"
                >
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Jump 🚀</h3>
                     <div className="flex flex-col w-full gap-3">
                        <button onClick={() => navigate('/habits')} className="flex items-center justify-between w-full p-3 rounded-2xl bg-white hover:bg-purple-50 transition-all border border-slate-100 text-slate-600 font-medium">
                            Habits<FiArrowRight/>
                        </button>

                        <button onClick={() => navigate('/goals')} className="flex items-center justify-between w-full p-3 rounded-2xl bg-white hover:bg-purple-50 transition-all border border-slate-100 text-slate-600 font-medium">
                            Goals<FiArrowRight/>
                        </button>

                        <button onClick={() => navigate('/profile')} className="flex items-center justify-between w-full p-3 rounded-2xl bg-white hover:bg-purple-50 transition-all border border-slate-100 text-slate-600 font-medium">
                            Profile<FiArrowRight/>
                        </button>
                     </div>
                </motion.div>

                 {/* HABITS SNAPSHOT */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white/60 backdrop-blur-md p-6 rounded-[40px] border border-white/50 shadow-xl"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <FaFire className="text-orange-500" /> Today's Habits
                        </h3>
                        <button onClick={() => navigate('/habits')} className="text-xs text-purple-600 font-bold hover:underline">View All</button>
                    </div>
                   <div className="space-y-3">
                    {Array.isArray(habits) && habits.length > 0 ? (
                        habits.slice(0, 3).map(habit => (
                        <div key={habit._id} className="flex items-center justify-between p-3 bg-white/50 rounded-2xl border border-slate-100">
                            <span className="text-sm text-slate-600 font-medium">{habit.title}</span>
                            <div className={`w-2 h-2 rounded-full ${habit.completedDates?.includes(new Date().toISOString().split('T')[0]) ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                        </div>
                    ))
                ) : (
                     <p className="text-xs text-slate-400 text-center py-4 italic">
                        No habits added yet! 🌸
                    </p>
                )}
                </div>

                </motion.div>


               {/* GOALS SNAPSHOT */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white/60 backdrop-blur-md p-6 rounded-[40px] border border-white/50 shadow-xl"
                >
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <FiTarget className="text-rose-500" /> Top Goals
                        </h3>
                        <button onClick={() => navigate('/goals')} className="text-xs text-rose-600 font-bold hover:underline">View All</button>
                    </div>
                    
                    <div className="space-y-4">
                          {Array.isArray(goals) && goals.length > 0 ? (
                            goals.slice(0, 3).map(goal => (
                            <div key={goal._id} className="space-y-1">
                                <div className="flex justify-between text-xs font-medium text-slate-600">
                                    <span>{goal.title}</span>
                                    <span>{Math.round((goal.currentValue / goal.targetValue) * 100)}%</span>
                                </div>
                                 <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div 
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000" 
                                    style={{ width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                            ))
                        ) : (
                        <p className="text-xs text-slate-400 text-center py-4 italic">
                            No goals set yet! 🌸
                         </p>
                         )}
                         </div>
             </motion.div>


                {/* motivation card */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-indigo-600 p-6 rounded-[40px] text-white shadow-xl flex flex-col justify-center items-center text-center"
                >
                    <p className="text-lg font-medium italic">"The only way to do great work is to love what you do."</p>
                    <p className="text-xs mt-4 opacity-70">— Steve Jobs</p>
                </motion.div>
            </div>

        </div>
    )
}


export default Dashboard ;