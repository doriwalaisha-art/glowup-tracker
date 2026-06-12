import {useState} from "react";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../context/authSlice';
import { motion } from "framer-motion";
import Input from "../components/input";
import Button from "../components/Button";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({ username : '', email : '', password : ''});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await API.post('/auth/signup', formData);
            dispatch(setCredentials({ user: data, token: data.token })); 

            alert("Account Created");
            navigate('/login');
        }catch(error){
            alert(error.response?.data?.message || "something went wrong");
        }
    };
    return (
        <div className = "min-h-screen flex Items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 p-4">
            <motion.div
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                className="bg-white/40 backdrop-blur-xl p-8 rounded-[30px] shadow-2xl border border-white/30 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
                <p className="text-center text-gray-500 mb-8">Start your glow-up journey today!</p>
                
                <form onSubmit={handleSubmit}>
                    <Input label="Username" name="username" type="text" placeholder="genz-Glow" value={formData.username} onChange={handleChange}   />
                    <Input label="Email" name="email" type="email" placeholder="user@glowup.com" value={formData.email} onChange={handleChange}   />
                    <Input label="Password" name="password" type="password" placeholder="......" value={formData.password} onChange={handleChange}   />

                    <Button type="submit" classname="mt-4">Sign-up</Button>

                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account? <Link to="/login" className="text-purple-600 font-semibold hover:underline">Login</Link>
                </p>
            </motion.div>

        </div>
    );
};

export default Signup;