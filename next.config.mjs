/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: "export",
  trailingSlash: true,

  images: {
    domains: [
      "raw.githubusercontent.com",
      "images.unsplash.com",
      "avatars.githubusercontent.com",
    ],
  },
};

export default nextConfig;
