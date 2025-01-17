import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import Label from "./Label";

const ImageUploader = ({
  name,
  onChange,
  ref,
  onBlur,
  value = [],
  className = "",
  error = null,
  label,
  acceptedTypes = ["jpeg", "png", "jpg"],
  minSize = 10 * 1024, // Minimum size in bytes (10 KB)
  maxSize = 5 * 1024 * 1024, // Maximum size in bytes (5 MB)
  ...props
}) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [fileErrors, setFileErrors] = useState([]);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const validateFiles = (files) => {
    const errors = [];
    const validFiles = [];

    Array.from(files).forEach((file) => {
      const fileType = file.type.split("/")[1];
      if (!acceptedTypes.includes(fileType)) {
        errors.push(`${file.name}: Unsupported file type.`);
      } else if (file.size < minSize) {
        errors.push(`${file.name}: File is too small.`);
      } else if (file.size > maxSize) {
        errors.push(`${file.name}: File exceeds the size limit.`);
      } else {
        validFiles.push(file);
      }
    });

    setFileErrors(errors);
    return validFiles;
  };

  const handleFiles = (files) => {
    const validFiles = validateFiles(files);
    if (validFiles.length) {
      onChange([...value, ...validFiles]); // Add valid files to the current value
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  return (
    <div className="w-full space-y-2">
       <Label label={label} htmlFor={name}/>
      <div
        className={`flex flex-col justify-center items-center cursor-pointer border-2 border-dashed px-12 py-8 rounded-md transition-all duration-200 
          ${dragging ? "bg-slate-100 border-slate-800" : "bg-white border-slate-600"}
          ${error || fileErrors.length ? "border-red-500" : ""} ${className}`}
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleFileInput}
          multiple
        />
        <Upload className="text-slate-500" size={32} />
        <h3 className="text-center text-sm font-medium">
          Drop your files or, <strong>Browse</strong>
        </h3>
        <p className="text-slate-500 text-sm mt-1">
          Supports {acceptedTypes.map((type) => type.toUpperCase()).join(", ")}{" "}
          file types.
        </p>
      </div>
      {value.length > 0 && (
        <div className="mt-4 flex flex-col flex-wrap gap-2">
          {value.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 border border-gray-300 rounded-md p-2 text-sm"
            >
              <span className="truncate max-w-xs">{file.name}</span>
              <button
                type="button"
                onClick={() => {
                  onChange(value.filter((_, i) => i !== idx));
                }}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
