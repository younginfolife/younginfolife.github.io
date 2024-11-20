import { withContentCollections } from "@content-collections/next";


/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	basePath: "/webpage",
};

export default withContentCollections(nextConfig);
