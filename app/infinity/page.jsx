"use client"
import InfiniteScroll from "@/components/InfiniteScroll";
import React, { useState } from "react";

// Generate random data
const generateRandomItems = (count) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push({
      title: `Item #${i + 1}`,
      id: i + 1,
      description: `This is a description for item #${i + 1}`,
    });
  }
  return items;
};

// Simulate a fetch request for more items
const fetchItems = async (page, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = [];
      resolve(items);
    }, 5000); // Simulate network delay of 1 second
  });
};

const TestPage = () => {
  const [hasMore, setHasMore] = useState(true);

  // Card component to render each item
  const Card = ({ title, id, description }) => (
    <div className="bg-gray-200 p-4 rounded-lg mb-4 w-64">
      <h3 className="font-semibold text-xl">{title}</h3>
      <p>{description}</p>
    </div>
  );

  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-2xl mb-4 text-center">Infinite Scroll Test</h1>
      <InfiniteScroll
        page={0}
        limit={40}
        fetchItems={fetchItems}
        Card={Card}
        hasMore={hasMore}
        initialItems={generateRandomItems(50)} // Start with 20 items
        loadingSkeleton={<div className="p-4 bg-gray-300 rounded-lg">Loading...</div>}
        scroll="horizontal"
        width="100%"
        height="200px"
        className=""
      />
    </div>
  );
};

export default TestPage;
