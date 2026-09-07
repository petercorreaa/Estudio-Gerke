import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin file tracing to this project. Without it Next walks up and picks the
  // lockfile in the home directory as the workspace root.
  outputFileTracingRoot: import.meta.dirname,
};

export default withNextIntl(nextConfig);
