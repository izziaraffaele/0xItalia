const rewrites = require('./next-rewrites.config');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  rewrites,
};
