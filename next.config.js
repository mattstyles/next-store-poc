
const compose = require('next-compose-plugins')
const withAnalyser = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYSE === 'true'
})
// const withPreact = require('@zeit/next-preact')
const withPreact = require('./plugins/preactX')({
  enabled: process.env.NODE_ENV === 'production'
  // enabled: true
})

const nextConfig = {}

module.exports = compose(
  [
    withAnalyser,
    withPreact
  ],
  nextConfig
)
