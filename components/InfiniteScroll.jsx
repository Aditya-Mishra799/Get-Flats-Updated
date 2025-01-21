import useApiHandler from "@/hooks/useApiHandler";
import React, { useState, useEffect } from "react";
import { useToast } from "./toast/ToastProvider";

const InfiniteScroll = ({
  page = 0,
  limit = 20,
  fetchItems,
  cardProps,
  loadingSkeleton,
  hasMore,
  Card,
  initialItems = [],
  width = "100%", // Default width
  height = "400px", // Default height
  scroll = "vertical", // Can be 'vertical' or 'horizontal'
  className,
  ...props
}) => {
  const [items, setItems] = useState(initialItems);
  const { addToast } = useToast();
  const [paginationData, setPaginationData] = useState({
    currentPage: page,
    limit: limit,
    hasMore: true,
  });

  const fetchMoreData = useApiHandler(async () => {
    try {
      const newItems = await fetchItems(
        paginationData.currentPage + 1,
        paginationData.limit
      );
      if (newItems.length === 0) {
        setPaginationData((prev) => ({ ...prev, hasMore: false }));
      }
      setItems((prev) => [...prev, ...newItems]);
      setPaginationData((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    } catch (error) {
      addToast("error", "Some error occurred while fetching the data");
    }
  });

  const handleScroll = (e) => {
    const scrollElement = e.target;

    if (scroll === "vertical") {
      if (
        scrollElement.scrollTop + scrollElement.clientHeight >=
        scrollElement.scrollHeight - 150
      ) {
        if (!fetchMoreData.loading && hasMore) {
          fetchMoreData.execute();
        }
      }
    } else if (scroll === "horizontal") {
      if (
        scrollElement.scrollLeft + scrollElement.clientWidth >=
        scrollElement.scrollWidth - 150
      ) {
        if (!fetchMoreData.loading && hasMore) {
          fetchMoreData.execute();
        }
      }
    }
  };

  useEffect(() => {
    const scrollContainer = document.getElementById("infinite-scroll-container");
    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, [fetchMoreData.loading, hasMore]);

  return (
    <div
      id="infinite-scroll-container"
      className={`w-full h-full overflow-${scroll} ${className}`}
      style={{ width, height, display: "flex", flexDirection: scroll === "vertical" ? "column" : "row", overflow: "auto" }}
      {...props}
    >
      {/* Show loading skeleton if there are no items and loading */}
      {items.length === 0 && fetchMoreData.loading && loadingSkeleton}
      
      {/* Render the fetched items */}
      {items.length > 0 && items.map((item, index) => (
        <Card key={index} {...cardProps} {...item} />
      ))}

      {/* Render loading skeletons at the end if more items are loading */}
      {fetchMoreData.loading && (
        <div className="flex justify-center items-center">
          {/* Loading indicator or skeleton here */}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
