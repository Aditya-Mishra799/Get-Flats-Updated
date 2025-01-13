"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProgressBar from "./ProgressBar";
import Button from "../Button";

const StepperForm = ({ stepsData = [] }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [pagesData, setPagesData] = useState({});
  const methods = useForm({
    resolver: zodResolver(stepsData[currentStep].schema),
    mode: "onBlur",
  });

  const isLastStep = currentStep === stepsData.length - 1;

  const handleNext = async (e) => {
    e.preventDefault();
    const values = methods.getValues();
    setPagesData((prev) => ({
      ...prev,
      [stepsData[currentStep].title]: values,
    }));
    Object.entries(values).map(([key, value]) => methods.setValue(key, value));
    const isValid = await methods.trigger(); // Validate current step
    if (isValid) {
      setCurrentStep((prev) => prev + 1); // Go to next step
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0)); // Go to previous step
  };

  const handleFormSubmit = async (data) => {
    alert("Form submitted successfully!");
    setPagesData((prev) => ({ ...prev, [stepsData[currentStep].title]: data }));
    setCurrentStep(0); // Reset to the first step
    methods.reset(); // Reset form values
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="max-w-3xl mx-auto p-4  lg:p-8 bg-white shadow-lg rounded-lg lg-w-[500px]"
      >
        {/* Progress Bar */}
        <ProgressBar
          steps={stepsData}
          currentStep={currentStep}
          completedSteps={[...Array(currentStep).keys()]}
        />

        {/* Step Title */}
        <h2 className="text-xl font-semibold text-gray-800 text-center mt-8">
          {stepsData[currentStep].title}
        </h2>

        {/* Step Content */}
        <div className="my-8 flex flex-wrap gap-2">{stepsData[currentStep].page}</div>

        {/* Notes */}
        <p className="text-sm text-gray-500">{stepsData[currentStep].note}</p>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          {/* Back Button */}
          <Button
            onClick={handlePrev}
            disabled={currentStep === 0}
            type="button"
            className="bg-gray-300 hover:bg-gray-400"
          >
            Back
          </Button>

          {/* Next or Submit Button */}
          {isLastStep ? (
            <Button type="submit" >
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              type="button" 
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default StepperForm;
