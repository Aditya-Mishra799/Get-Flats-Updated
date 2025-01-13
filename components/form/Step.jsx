"use client"
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ControlFormField from "./ControlFormField";
import Input from "../Input";
import SearchableSelect from "../SearchableSelect";
import SearchableMultiSelect from "../SearchableMultiSelect";
import SegmentedSingleSelect from "../SegmentedSingleSelect";

const Step = ({ fields }) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-wrap gap-4 lg:gap-8 justify-left">
      {fields.map((field) => (
        <ControlFormField key={field.name} {...field} />
      ))}
    </div>
  );
};

export default Step;
