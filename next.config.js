import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  //basePath: "/webpage",
  images: {
    unoptimized: true,
  },
};

export default withContentCollections(nextConfig);
