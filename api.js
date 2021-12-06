const axios = require('axios');

exports.postHTTP = async (url, body) => {
    return axios({
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data:body
    })
}