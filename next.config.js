import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/webpage" : "",
  images: {
    unoptimized: true,
  },
};

export default withContentCollections(nextConfig);
