/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  trailingSlash: true,

  images: {
    domains: [
      "raw.githubusercontent.com",
      "images.unsplash.com",
      "avatars.githubusercontent.com",
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
