const axios = require('axios')

exports.api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})
