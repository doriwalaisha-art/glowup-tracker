import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../context/authSlice';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', formData);
            dispatch(setCredentials({ user: data, token: data.token }));
            alert("Welcome back!");
            navigate('/dashboard'); 
        } catch (error) {
            alert(error.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="bg-white/40 backdrop-blur-xl p-8 rounded-[30px] shadow-2xl border border-white/30 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back! 🌸</h2>
                <p className="text-center text-gray-500 mb-8">Ready to continue your glow-up ?</p>
                
                <form onSubmit={handleSubmit}>
                    <Input label="Email" name="email" type="email" placeholder="hello@glowup.com" value={formData.email} onChange={handleChange} />
                    <Input label="Password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                    
                    <Button type="submit" className="mt-4">Login</Button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    New here? <Link to="/signup" className="text-purple-600 font-semibold hover:underline">Create Account</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
