module.exports = {
    images: {
      domains: [
        'res.cloudinary.com',
        'localhost'
      ],
    },
    async redirects() {
      return [
        {
          source: '/payment/paynet/callback',
          destination: '/api/payment/paynet/callback',
          permanent: true,
        },
      ]
    },  
}