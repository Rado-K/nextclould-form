"use client";

import React, { useState } from "react";

type Props = React.ComponentPropsWithRef<"input">;

const CustomFileSelector = (props: Props) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      props.onChange?.({
        target: {
          files: e.dataTransfer.files,
        },
      } as React.ChangeEvent<HTMLInputElement>);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      className={`flex items-center justify-center border-4 border-dashed rounded-lg p-8 transition-colors duration-200 ease-in-out ${
        dragging
          ? "border-soft-coral bg-soft-peach"
          : "border-pink-500 bg-pink-50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor="file-upload"
        className="flex items-center cursor-pointer text-pink-500 hover:text-pink-600"
      >
        <span className="text-lg text-center">
          Хвани и постави или просто кликни.
        </span>
      </label>
      <input
        id="file-upload"
        {...props}
        type="file"
        multiple
        className="hidden"
      />
    </div>
  );
};

export default CustomFileSelector;
