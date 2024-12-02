import createMDX from "@next/mdx";

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "export",
  basePath: isProd ? "/stephenyang" : "",
  assetPrefix: isProd ? "/stephenyang/" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.bib$/,
      use: "raw-loader",
    });
    return config;
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
