"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  images: File[];
}

const ImagePreview = ({ images }: Props) => {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [visibleImages, setVisibleImages] = useState<number>(6); // Initial number of images to display

  useEffect(() => {
    const srcs = images.map((image) => URL.createObjectURL(image));
    setImageSrcs(srcs);

    // Clean up URLs on unmount
    return () => {
      srcs.forEach((src) => URL.revokeObjectURL(src));
    };
  }, [images]);

  const loadMoreImages = () => {
    setVisibleImages((prev) => Math.min(prev + 6, images.length));
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-4">
        {imageSrcs.slice(0, visibleImages).map((src, index) => (
          <div className="relative aspect-video" key={images[index].name}>
            <Image
              src={src}
              alt={images[index].name}
              className="object-cover"
              fill
              loading="lazy"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      {visibleImages < images.length && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-200 ease-in-out rounded-md"
            onClick={loadMoreImages}
          >
            Зареди още..
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
