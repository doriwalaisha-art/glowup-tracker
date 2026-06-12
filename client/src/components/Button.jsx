const Button = ({ children , onClick, type = "butoon", className = "" }) => {
    return(
        <button
            type={type}
            onClick = {onClick}
            className={`w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-purple-300/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;