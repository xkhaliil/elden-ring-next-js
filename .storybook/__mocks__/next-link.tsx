import React from "react";

const Link = ({
  href,
  children,
  onClick,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  [key: string]: unknown;
}) => (
  <a href={href} onClick={onClick} {...props}>
    {children}
  </a>
);

export default Link;
