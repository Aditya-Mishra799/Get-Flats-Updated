import Link from "next/link";
import React from "react";

const FormCard = ({ title, _id, expiresAt, createdAt }) => {
  // Convert createdAt and expiresAt to Date objects
  const creationDate = new Date(createdAt);
  const expiryDate = new Date(expiresAt);

  // Format the creation date into a human-readable format
  const formattedCreationDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(creationDate);

  // Calculate the time difference between now and expiration
  const now = Date.now();
  const timeRemaining = expiryDate - now;

  let timeText = "";
  if (timeRemaining <= 0) {
    timeText = "Expired";
  } else if (timeRemaining < 60 * 1000) {
    timeText = `Expires in ${Math.floor(timeRemaining / 1000)} seconds`;
  } else if (timeRemaining < 60 * 60 * 1000) {
    timeText = `Expires in ${Math.floor(timeRemaining / (60 * 1000))} minutes`;
  } else if (timeRemaining < 24 * 60 * 60 * 1000) {
    timeText = `Expires in ${Math.floor(
      timeRemaining / (60 * 60 * 1000)
    )} hours`;
  } else {
    timeText = `Expires in ${Math.floor(
      timeRemaining / (24 * 60 * 60 * 1000)
    )} days`;
  }

  return (
    <div className="bg-slate-50 text-black shadow-lg rounded-lg p-4 max-w-xs ">
      <h3 className="font-base text-lg  mb-2 truncate">
        {title}
      </h3>
      <p className="text-xs mb-2">
        Created: {formattedCreationDate}
      </p>
      <p className="text-sm mb-4">{timeText}</p>
      <Link
        href={`/add-listing/${_id}`}
        className="block text-sm tracking-wide font-thin text-center bg-slate-600 text-white py-1 px-2 rounded-md hover:bg-slate-700 transition-all duration-300"
      >
        Complete Form
      </Link>
    </div>
  );
};

export default FormCard;
