import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ControlFormField from "./ControlFormField";
import Input from "../Input";
import SearchableSelect from "../SearchableSelect";
import SearchableMultiSelect from "../SearchableMultiSelect";

const Step = ({ stepName }) => {
  const { control } = useFormContext();

  const fields = {
    personalInfo: [
      { name: "fullName", label: "Full Name", type: "text", component: Input },
      { name: "email", label: "Email", type: "email", component: Input },
      {
        name: "languages",
        label: "Languages",
        options: ["c", "cpp", "chash", "python", "java", "javascript"],
        component: SearchableMultiSelect,
      },
    ],
    address: [
      {
        name: "addressLine1",
        label: "Address Line 1",
        type: "text",
        component: Input,
      },
      { name: "city", label: "City", type: "text", component: Input },
    ],
    review: [
      {
        name: "comments",
        label: "Additional Comments",
        type: "textarea",
        component: Input,
      },
    ],
  }[stepName];

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field) => (
        <ControlFormField key={field.name} {...field} />
      ))}
    </div>
  );
};

export default Step;
