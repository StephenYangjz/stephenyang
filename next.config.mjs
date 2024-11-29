import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */

// Detect if the app is running in production
const isProd = process.env.NODE_ENV === "production";

// Define the base Next.js configuration
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Configure static export for GitHub Pages
  output: "export", // Required for static export in newer Next.js versions
  basePath: isProd ? "/stephenyang" : "", // Replace with your GitHub repository name
  assetPrefix: isProd ? "/stephenyang/" : "",
  trailingSlash: true, // Ensures paths end with a trailing slash for GitHub Pages compatibility
  images: {
    unoptimized: true, // Disable server-side image optimization for GitHub Pages
  },

  // Add any additional Next.js config below
  webpack: (config, { isServer }) => {
    // Add custom rules for handling .bib files
    config.module.rules.push({
      test: /\.bib$/,
      use: "raw-loader",
    });

    return config;
  },
};

// Create the MDX configuration and merge with Next.js configuration
const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Export the combined configuration
export default withMDX(nextConfig);
