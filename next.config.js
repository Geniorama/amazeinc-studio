/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n:{
    locales: ['en-US', 'es-ES'],
    defaultLocale: "en-US",
    localeDetection: false
  },
  images: {
    domains: ['geniorama.site', 'www.geniorama.site', 'cloudinary.com', 'res.cloudinary.com'],
  },

  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/projects/category/all',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
