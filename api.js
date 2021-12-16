const axios = require('axios');

exports.postHTTP = async (url, body) =>
  axios({
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
