import type { NextConfig } from "next";

const configuredApiOrigin = process.env.NEXT_PUBLIC_API_URL?.trim();

if (!configuredApiOrigin && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_API_URL must be set for production builds: it is the destination of the same-origin API proxy.",
  );
}

const apiOrigin = (configuredApiOrigin || "http://localhost:8000").replace(
  /\/+$/,
  "",
);

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${apiOrigin}/api/auth/:path*`,
      },
      {
        source: "/api/proxy/:path*",
        destination: `${apiOrigin}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
