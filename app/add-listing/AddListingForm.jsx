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
import { Contact, HousePlus, Image, MessageSquareText } from "lucide-react";
import TextArea from "@/components/TextArea";
import ImageUploader from "@/components/ImageUploader";
import axios from "axios";

const pages = {
  basicDetails: [
    {
      name: "property_title",
      label: "Property Title",
      type: "text",
      component: Input,
      fullWidth: true,
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
      name: "amenities",
      label: "Amenities",
      defaultValue: [],
      options: amenitiesOptions,
      component: SearchableMultiSelect,
      fullWidth: true,
      className: "max-w-[500px]",
    },
    {
      name: "property_type",
      label: "Property Type",
      defaultValue: "",
      options: propertyOptions,
      component: SearchableSelect,
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
      component: TextArea,
      className: "max-w-[400px]",
      cols: 60,
      rows: 8,
      defaultValue: "",
      fullWidth: true,
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
  images: [
    {
      name: "property_images",
      label: "Add Images",
      component: ImageUploader,
      className: "max-w-[400px]",
      defaultValue: [],
      fullWidth: true,
    },
  ],
};

const AddListingForm = ({ id }) => {
  const stepsData = [
    {
      id: 1,
      title: "Basic Details",
      icon: <HousePlus size={14} />,
      schema: stepSchemas.basicDetails,
      page: <Step fields={pages["basicDetails"]} />,
      note: "Provide the basic details of property",
    },
    {
      id: 2,
      title: "Description",
      icon: <MessageSquareText size={14} />,
      schema: stepSchemas.description,
      page: <Step fields={pages["description"]} />,
      note: "Enter your current description details accurately.",
    },
    {
      id: 3,
      title: "Pricing and Contacts",
      icon: <Contact size={14} />,
      schema: stepSchemas.pricingAndContacts,
      page: <Step fields={pages["pricingAndContacts"]} />,
      note: "Review your information before submitting.",
    },
    {
      id: 4,
      title: "Propert Images",
      icon: <Image size={14} />,
      schema: {},
      page: <Step fields={pages["images"]} />,
      note: "Review your information before submitting.",
    },
  ];
  const handleSaveForm = async (page, data) => {
    try {
      await axios.post("/api/forms/save", {
        id: id,
        userId: null,
        page: page,
        data: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <StepperForm stepsData={stepsData} />
    </div>
  );
};

export default AddListingForm;
