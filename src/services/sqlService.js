import config from '../config.json'
const axios = require('axios');


function runSQL(body){
    return  axios.post(config.baseUrl+'food/select',body)
}

function create(body){
    return  axios.post(config.baseUrl+'table/create',body)
}

function insert(body){
    return  axios.post(config.baseUrl+'table/insert',body)
}

function select(body){
    return  axios.post(config.baseUrl+'table/select',body)
}

function update(body){
    return  axios.post(config.baseUrl+'table/update',body)
}

function deleteRecord(body){
    return  axios.post(config.baseUrl+'table/delete',body)
}

function getTableStructure(body){
    return  axios.post(config.baseUrl+'table/get-table-structure',body)
}

function getSingle(body){
    return  axios.post(config.baseUrl+'table/get-single',body)
}

function describeTable(body){
    return  axios.post(config.baseUrl+'table/describe-table',body)
}

function createTable(body){
    return  axios.post(config.baseUrl+'table/create-table',body)
}

export default {
    runSQL,create,insert,select,update,deleteRecord,getTableStructure,getSingle,describeTable,createTable
};