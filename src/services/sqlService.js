import config from '../config.json'
const axios = require('axios');


function runSQL(body){
    return  axios.post(config.baseUrl+'food/select',body)
}

function create(body){
    return  axios.post(config.baseUrl+'sql/create',body)
}

function insert(body){
    return  axios.post(config.baseUrl+'sql/insert',body)
}

export default {
    runSQL,create,insert
};