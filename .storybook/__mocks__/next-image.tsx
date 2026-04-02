import React from "react";

const Image = ({
  src,
  alt,
  width,
  height,
  ...props
}: {
  src: string | { src: string };
  alt: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={typeof src === "object" ? src.src : src}
    alt={alt}
    width={width}
    height={height}
    {...props}
  />
);

export default Image;
