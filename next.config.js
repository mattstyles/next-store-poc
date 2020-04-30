
const withAnalyser = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYSE
})

const nextConfig = {}

module.exports = withAnalyser(nextConfig)
