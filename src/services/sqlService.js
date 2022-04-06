import config from '../config.json'
const axios = require('axios');


function runSQL(body){
    return  axios.post(config.baseUrl+'food/select',body)
}

export default {
    runSQL
};