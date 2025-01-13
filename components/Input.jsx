import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  placeholder,
  error,
  ...props
}) => {
  return (
    <div className = "flex flex-col">
      {label && (
        <label htmlFor={name} className="text-gray-700 font-medium mb-2">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`px-4 py-2 rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent
           `}
        {...props}
      />
    </div>
  );
};

export default Input;
