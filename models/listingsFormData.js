import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema(
  {
    basicDetails: {
      property_title: { type: String, required: true },
      listing_type: { type: String, required: true },
      furnished_status: { type: String, required: true },
      amenities: { type: [String], default: [] },
      property_type: { type: String, default: "" },
      bathrooms: { type: Number, default: 0 },
      bedrooms: { type: Number, default: 0 },
      halls: { type: Number, default: 0 },
      construction_date: { type: Date, default: null },
      area: { type: Number, default: 50 },
    },
    description: {
      property_description: { type: String, default: "" },
    },
    pricingAndContacts: {
      phone: { type: Number, required: true },
      price: { type: Number, default: 0 },
    },
    images: {
      property_images: { type: [String], default: [] },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming userId is from the User model
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    ttl: 60 * 60 * 24 * 2, // TTL of 2 days in seconds
  }
);

// Create model
const ListingFormData = mongoose.models.FormData || mongoose.model("FormData", formDataSchema);

export default ListingFormData;
