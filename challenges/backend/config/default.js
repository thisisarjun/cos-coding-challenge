module.exports = {  
  auth: {
    userId: 'buyer-challenge@caronsale.de',
    password: 'Test123.'
  },
  carOnSale: {
    host: 'https://api-core-dev.caronsale.de',
    paths: {
      authentication: '/api/v1/authentication',
      getRunningAuctions: '/api/v2/auction/buyer/'
    }
  }
}