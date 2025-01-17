"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProgressBar from "./ProgressBar";
import Button from "../Button";

const StepperForm = ({ stepsData = [], handleSaveForm, titleField, fetchCurrentPageData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [pagesData, setPagesData] = useState({});
  const [title, setTitle] = useState("");
  const methods = useForm({
    resolver: zodResolver(stepsData[currentStep].schema),
    mode: "onBlur",
  });

  const isLastStep = currentStep === stepsData.length - 1;

  useEffect(()=>{
    const  fetchDefaultValues = async ()=>{
      const {pageData, title, currentPage} = await fetchCurrentPageData(stepsData[currentStep].title)
      methods.reset(pageData); 
      setTitle(title)
      if(currentPage !== 0)
        setCurrentStep(currentPage + 1 || 0)
    }
    fetchDefaultValues()
  }, [])

  const handleNext = async (e) => {
    e.preventDefault();
    const values = methods.getValues();
    if (values[titleField]) {
      setTitle(values[titleField]);
    }
    setPagesData((prev) => ({
      ...prev,
      [stepsData[currentStep].title]: values,
    }));
    Object.entries(values).map(([key, value]) => methods.setValue(key, value));
    const isValid = await methods.trigger();
    if (isValid) {
      await handleSaveForm(
        currentStep,
        values,
        title || values[titleField]
      );
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0)); // Go to previous step
  };

  const handleFormSubmit = async (data) => {
    alert("Form submitted successfully!");
    setPagesData((prev) => ({ ...prev, [stepsData[currentStep].title]: data }));
    setCurrentStep(0);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="max-w-3xl mx-auto p-4  lg:p-8 bg-white shadow-lg  rounded-lg md:max-w-[500px] lg:max-w-[600px] pt-8"
      >
        {/* Progress Bar */}
        <ProgressBar
          steps={stepsData}
          currentStep={currentStep}
          completedSteps={[...Array(currentStep).keys()]}
        />

        {/* Step Title */}
        <h2 className="text-xl font-base text-gray-800 text-center mt-8">
          {stepsData[currentStep].title}
        </h2>

        {/* Step Content */}
        <div className="my-8 flex flex-wrap gap-2 justify-stretch  items-center w-fit mx-auto h-full">
          {stepsData[currentStep].page}
        </div>

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
            <Button type="submit">Submit</Button>
          ) : (
            <Button onClick={handleNext} type="button">
              Next
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default StepperForm;
