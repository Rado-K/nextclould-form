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
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-gray-700"
        >
          Firstname
        </label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-between mb-4">
        <CustomFileSelector
          accept={allFileTypes}
          onChange={handleFileSelected}
          required
        />
        <button
          type="submit"
          className={classNames({
            "bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md":
              true,
            "disabled pointer-events-none opacity-40": uploading,
          })}
          disabled={uploading}
        >
          Upload
        </button>
      </div>
      <ImagePreview images={images} />
    </form>
  );
};

export default FileUploadForm;
