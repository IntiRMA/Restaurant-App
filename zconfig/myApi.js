class MYAPI{
    getJson(endpoint, opts){
        const protocol = 'http';
        const hostName = '://developers.zomato.com';
        const versionPath = '/api/v2.1/';
        const axios = require('axios');
        const cache = require('memory-cache');
        const cloneDeep = require('lodash.clonedeep');
        const offset = 0;
        const limit = 100000;
        const timeout = 20 * 1000;
        const cacheLimit = 1000000 * 1000;
        const config={
            userKey: '9fb959d727012e2c284d7a57c033ca5e',
        };

        if (opts == null) {
            opts = {};
        }
        const zomatoApi = axios.create({
            baseUrl: `${protocol}${hostName}${versionPath}`,
            timeout: timeout,
            headers: {
                'user-key': config.userKey
            }
        });
        const url = `${protocol}${hostName}${
            versionPath
            }${endpoint}`;

        return zomatoApi
            .get(url, {
                params: opts
            })
            .then(response => {
                if (response) {
                    if (
                        response.statusCode !== undefined &&
                        response.statusCode !== 200
                    ) {
                        console.log(response);
                    } else {
                        response = response.data;
                        return response;
                    }
                }
            })
            .catch(error => console.log(error));
    }
}


export default new MYAPI();