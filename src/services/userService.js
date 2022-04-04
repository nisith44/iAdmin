import config from '../config.json'
const axios = require('axios');


function getUsers(body){
    return  axios.post(config.baseUrl+'food/select',body)
}

export default {
    getUsers
};