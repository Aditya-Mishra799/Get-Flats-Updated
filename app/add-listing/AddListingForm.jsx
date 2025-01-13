"use client";
import React from "react";
import Step from "@/components/form/Step";
import StepperForm from "@/components/form/StepperForm";
import Input from "@/components/Input";
import SegmentedSingleSelect from "@/components/SegmentedSingleSelect";
import stepSchemas from "./PropertyListingValidationSchema";
import {
  amenitiesOptions,
  furnishedStatusOptions,
  listingTypeOptions,
  propertyOptions,
} from "@/data/ListingOptions";
import SearchableSelect from "@/components/SearchableSelect";
import SearchableMultiSelect from "@/components/SearchableMultiSelect";
import { Contact, HousePlus, MessageSquareText } from "lucide-react";

const pages = {
  basicDetails: [
    {
      name: "property_title",
      label: "Property Title",
      type: "text",
      component: Input,
    },
    {
      name: "listing_type",
      label: "Listing Type",
      defaultValue: listingTypeOptions[0],
      options: listingTypeOptions,
      component: SegmentedSingleSelect,
    },
    {
      name: "furnished_status",
      label: "Furnished Status",
      defaultValue: furnishedStatusOptions[0],
      options: furnishedStatusOptions,
      component: SegmentedSingleSelect,
    },
    {
      name: "property_type",
      label: "Property Type",
      defaultValue: "",
      options: propertyOptions,
      component: SearchableSelect,
    },
    {
      name: "amenities",
      label: "Amenities",
      defaultValue: [],
      options: amenitiesOptions,
      component: SearchableMultiSelect,
    },
    {
      name: "bathrooms",
      label: "Bathrooms",
      type: "number",
      component: Input,
      defaultValue: "0",
    },
    {
      name: "bedrooms",
      label: "Bedrooms",
      type: "number",
      component: Input,
      defaultValue: "0",
    },
    {
      name: "halls",
      label: "Halls",
      type: "number",
      component: Input,
      defaultValue: "0",
    },
    {
      name: "construction_date",
      label: "Construction Date",
      type: "date",
      component: Input,
      defaultValue: "",
    },
    {
      name: "area",
      label: "Area",
      type: "number",
      component: Input,
      defaultValue: "50",
    },
  ],
  description: [
    {
      name: "property_description",
      label: "Description",
      type: "text",
      component: Input,
    },
  ],
  pricingAndContacts: [
    {
      name: "phone",
      label: "Phone",
      type: "number",
      component: Input,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      component: Input,
      defaultValue: "0",
    },
  ],
};

const AddListingForm = () => {
  const stepsData = [
    {
      id: 1,
      title: "Personal Info",
      icon: <HousePlus />,
      schema: stepSchemas.basicDetails,
      page: <Step fields={pages["basicDetails"]} />,
      note: "Provide the basic details of property",
    },
    {
      id: 2,
      title: "Description",
      icon: <MessageSquareText />,
      schema: stepSchemas.description,
      page: <Step fields={pages["description"]} />,
      note: "Enter your current description details accurately.",
    },
    {
      id: 3,
      title: "Pricing and Contacts",
      icon: <Contact />,
      schema: stepSchemas.pricingAndContacts,
      page: <Step fields={pages["pricingAndContacts"]} />,
      note: "Review your information before submitting.",
    },
  ];
  return (
    <div>
      <StepperForm stepsData={stepsData} />
    </div>
  );
};

export default AddListingForm;
