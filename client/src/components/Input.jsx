const Input = ({ label, type, name, value, onChange, placeholder }) => {
    return (
        <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-600 mb-1 ml-1">{label}</label>
            
            <input
                type={type}
                name={name}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 placeholder:text-gray-400 shadow-sm"
            />
        </div>
    )
}

export default Input;