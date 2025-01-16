import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons

const Input = ({
  label,
  type = "text",
  name,
  placeholder,
  error,
  className = "",
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle visibility

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name} className="text-gray-700 font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={name}
          name={name}
          type={isPasswordVisible ? "text" : type} // Toggle between password and text type
          placeholder={placeholder}
          className={`px-4 py-2 rounded-lg border w-full ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${type === "password" ? "pr-10" : ""}
           ${className} `}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            aria-label="Toggle password visibility"
          >
            {isPasswordVisible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
