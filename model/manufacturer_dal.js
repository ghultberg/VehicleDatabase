var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM manufacturer;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(manufacturer_id, callback) {
    var query = 'SELECT * FROM manufacturer WHERE manufacturer_id = ?';
    var queryData = [manufacturer_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO manufacturer (name, country) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.name, params.country];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(manufacturer_id, callback) {
    var query = 'DELETE FROM manufacturer WHERE manufacturer_id = ?';
    var queryData = [manufacturer_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};