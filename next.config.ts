import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const path = require(`path`);

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    reactCompiler: true,
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "src/app/[locale]/styles")],
  },

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": path.resolve(__dirname, "src/app/[locale]/styles"),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
