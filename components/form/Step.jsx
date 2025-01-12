import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const Step = ({ stepName }) => {
  const { control } = useFormContext();

  const fields = {
    personalInfo: [
      { name: "fullName", label: "Full Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
    ],
    address: [
      { name: "addressLine1", label: "Address Line 1", type: "text" },
      { name: "city", label: "City", type: "text" },
    ],
    review: [
      { name: "comments", label: "Additional Comments", type: "textarea" },
    ],
  }[stepName];

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col">
              <label htmlFor={field.name} className="text-gray-700 font-medium">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  {...field}
                  className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <input
                  {...field}
                  type={field.type}
                  className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              )}
              {fieldState.error && (
                <span className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      ))}
    </div>
  );
};

export default Step;
