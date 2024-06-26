"use client";

import React, { useEffect, useRef } from "react";
import "./styles.scss";
import classNames from "classnames";

type Props = {
  loading?: boolean;
  width?: number;
  height?: number;
};

const HeartLoading: React.FC<Props> = ({
  loading = true,
  width = 40,
  height = 40,
}) => {
  const heartClipRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!heartClipRef.current) {
      return;
    }

    if (loading) {
      heartClipRef.current.classList.add("loading");
    } else {
      heartClipRef.current.classList.remove("loading");
    }
  }, [loading]);

  return (
    <div className="flex justify-center items-center">
      <svg id="heart" height="0" width="0">
        <defs>
          <clipPath id="svgPath">
            <path d="M20,35.09,4.55,19.64a8.5,8.5,0,0,1-.13-12l.13-.13a8.72,8.72,0,0,1,12.14,0L20,10.79l3.3-3.3a8.09,8.09,0,0,1,5.83-2.58,8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.13,12l-.13.13Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="relative w-10 h-10">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className="absolute top-0 left-0 fill-pink-500"
        >
          <path d="M20,35.07,4.55,19.62a8.5,8.5,0,0,1-.12-12l.12-.12a8.72,8.72,0,0,1,12.14,0L20,10.77l3.3-3.3A8.09,8.09,0,0,1,29.13,4.9a8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.12,12l-.12.12ZM10.64,7.13A6.44,6.44,0,0,0,6.07,18.19L20,32.06,33.94,18.12A6.44,6.44,0,0,0,34,9l0,0a6.44,6.44,0,0,0-4.77-1.85A6,6,0,0,0,24.83,9L20,13.78,15.21,9A6.44,6.44,0,0,0,10.64,7.13Z" />
        </svg>
        <a
          href="#"
          ref={heartClipRef}
          className={classNames(
            "block w-full h-full relative overflow-hidden",
            'before:content-[""] before:block before:w-full before:h-full before:rounded-full before:bg-pink-500 before:opacity-0 before:scale-0 before:transition-transform before:duration-200 before:linear before:transform-origin-center before:transform-origin-[60%]',
            {
              "animate-pulse": loading,
              "before:scale-100 before:opacity-100": loading,
            },
          )}
          style={{ clipPath: "url(#svgPath)" }}
        ></a>
      </div>
    </div>
  );
};

export default HeartLoading;
