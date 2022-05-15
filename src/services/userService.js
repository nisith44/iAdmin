import config from '../config.json'
const axios = require('axios');


function getUsers(){
    return  axios.get(config.baseUrl+'user/allusers')
}

export default {
    getUsers
};