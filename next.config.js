/** @type {import('next').NextConfig} */
require('dotenv').config();
const withVideos = require('next-videos')
const withPlugins = require("next-compose-plugins");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ]
  }
  
};




const plugins = [withVideos];

module.exports = (_phase, { defaultConfig }) => {
  return plugins.reduce(
    (acc, plugin) => {
      if (Array.isArray(plugin)) {
        return plugin[0](acc, plugin[1]);
      }
      return plugin(acc);
    },
    { ...nextConfig }
  );
};