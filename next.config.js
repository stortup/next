/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["i.morioh.com"],
    formats: ["image/avif", "image/webp"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};
