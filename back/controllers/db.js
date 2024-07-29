const { Client } = require('pg');
const CONST = require('../utils/consts');

exports.GetClient = async function (){
    return new Client(CONST.DB_CONN);
}