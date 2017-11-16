export default Config = {
    api: {
        quakes_geonet_url: 'https://api.geonet.org.nz/quake?MMI=',
        news_url: "https://api.geonet.org.nz/news/geonet",
        quakes_usgs_url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/'
    },
    share: {
        url: 'http://quakechat.kiwiinfo.com/'
    },
    products: {
        productIdentifier: 'com.lucy.quakechat.productid'
    },

    receiptVerify: {
        Host: {
            productionHost: 'https://buy.itunes.apple.com/verifyReceipt',
            sandboxHost: 'https://sandbox.itunes.apple.com/verifyReceipt'
        },
        statusCode: {
            '0': {message: 'Active', valid: true, error: false},
            '21000': {message: 'App store could not read', valid: false, error: true},
            '21002': {message: 'Data was malformed', valid: false, error: true},
            '21003': {message: 'Receipt not authenticated', valid: false, error: true},
            '21004': {message: 'Shared secret does not match', valid: false, error: true},
            '21005': {message: 'Receipt server unavailable', valid: false, error: true},
            '21006': {message: 'Receipt valid but sub expired', valid: true, error: false},
            /**
             * special case for app review handling - forward any request that is intended for the Sandbox but was sent to
             * Production, this is what the app review team does
             */
            '21007': {
                message: 'Sandbox receipt sent to Production environment',
                valid: false,
                error: true,
                redirect: true
            },
            '21008': {message: 'Production receipt sent to Sandbox environment', valid: false, error: true},
        }
    }


};

