"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProgressBar from "./ProgressBar";
import Button from "../Button";
import Step from "./Step";
import { stepSchemas } from "./schemas";

const stepsData = [
  {
    id: 1,
    title: "Personal Info",
    icon: <svg>/* Icon */</svg>,
    schema: stepSchemas.personalInfo,
    page: <Step stepName="personalInfo" />,
    note: "Provide your full name and email address.",
  },
  {
    id: 2,
    title: "Address",
    icon: <svg>/* Icon */</svg>,
    schema: stepSchemas.address,
    page: <Step stepName="address" />,
    note: "Enter your current address details accurately.",
  },
  {
    id: 3,
    title: "Review & Submit",
    icon: <svg>/* Icon */</svg>,
    schema: stepSchemas.review,
    page: <Step stepName="review" />,
    note: "Review your information before submitting.",
  },
];

const StepperForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [pagesData, setPagesData] = useState({})
  const methods = useForm({
    resolver: zodResolver(stepsData[currentStep].schema),
    mode: "onBlur",
  });

  const isLastStep = currentStep === stepsData.length - 1;

  const handleNext = async (e) => {
    e.preventDefault()
    const values = methods.getValues()
    setPagesData(prev => ({...prev, [stepsData[currentStep].title]: values}))
    Object.entries(values).map(([key, value])=>methods.setValue(key, value))
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
    setPagesData(prev => ({...prev, [stepsData[currentStep].title]: data}))
    setCurrentStep(0); // Reset to the first step
    methods.reset(); // Reset form values
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg"
      >
        {/* Progress Bar */}
        <ProgressBar
          steps={stepsData}
          currentStep={currentStep}
          completedSteps={[...Array(currentStep).keys()]}
        />

        {/* Step Title */}
        <h2 className="text-xl font-semibold text-gray-800 text-center mt-4">
          {stepsData[currentStep].title}
        </h2>

        {/* Step Content */}
        <div className="my-8">{stepsData[currentStep].page}</div>

        {/* Notes */}
        <p className="text-sm text-gray-500">{stepsData[currentStep].note}</p>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          {/* Back Button */}
          <Button
            onClick={handlePrev}
            disabled={currentStep === 0}
            type = "button"
            className="bg-gray-300 hover:bg-gray-400"
          >
            Back
          </Button>

          {/* Next or Submit Button */}
          {isLastStep ? (
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              type="button"
              className="bg-blue-500 hover:bg-blue-600"
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
