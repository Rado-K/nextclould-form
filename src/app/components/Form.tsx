"use client"; // Make this component a client component
import React, { FormEvent, useState } from "react";
import CustomFileSelector from "../../app/components/CustomFileSelector";
import ImagePreview from "../../app/components/ImagePreview";
import axios from "axios";
import classNames from "classnames";

const fileTypes = {
  images: [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/bmp",
    "image/webp",
  ],
  videos: [
    "video/mp4",
    "video/mpeg",
    "video/quicktime",
    "video/x-msvideo", // AVI
    "video/x-ms-wmv", // WMV
    "video/webm",
    "video/ogg",
    "video/mkv",
    "video/3gpp",
  ],
  compressed: [
    "application/zip",
    "application/x-zip-compressed",
    "application/x-rar-compressed",
    "application/x-7z-compressed",
    "application/x-tar",
    "application/gzip",
    "application/x-bzip",
    "application/x-bzip2",
    "application/x-ace-compressed",
    "application/x-lzip",
    "application/x-lzma",
    "application/x-lzop",
    "application/x-snappy-framed",
    "application/x-xz",
  ],
};

// To get a combined list of all file types:
const allFileTypes = [
  ...fileTypes.images,
  ...fileTypes.videos,
  ...fileTypes.compressed,
].join(", ");

const FileUploadForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [firstname, setFirstname] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const _files = Array.from(e.target.files);
      setImages(_files);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    const queryParams = new URLSearchParams({
      name: firstname,
      description,
    }).toString();

    setUploading(true);
    try {
      const response = await fetch(`/api/upload?${queryParams}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      className="w-full bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-gray-700"
        >
          Име*:
        </label>
        <input
          type="text"
          id="firstname"
          autocomplete="off"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Послание:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>
      <div className="flex flex-col items-center mb-6">
        <CustomFileSelector
          accept={allFileTypes}
          onChange={handleFileSelected}
          required
        />
        <button
          type="submit"
          className={classNames({
            "mt-4 bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-200 ease-in-out px-4 py-2 rounded-md shadow-sm":
              true,
            "disabled pointer-events-none opacity-50": uploading,
          })}
          disabled={uploading}
        >
          Изпрати
        </button>
      </div>
      <ImagePreview images={images} />
    </form>
  );
};

export default FileUploadForm;
