var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM customer;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

/*
 CREATE OR REPLACE VIEW customer_garage AS
 SELECT c.customer_id, c.first_name, c.last_name, m.name, v.model, v.model_year, so.sale_price
 FROM customer c
 JOIN sale_order so ON c.customer_id=so.customer_id
 JOIN vehicle v ON v.vehicle_id=so.vehicle_id
 JOIN manufacturer m ON m.manufacturer_id=v.manufacturer_id;
 */

exports.getById = function(customer_id, callback) {
    var query = 'SELECT * FROM customer_garage WHERE customer_id = ?';
    var queryData = [customer_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO customer (first_name, last_name, email) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.first_name, params.last_name, params.email];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(customer_id, callback) {
    var query = 'DELETE FROM customer WHERE customer_id = ?';
    var queryData = [customer_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE customer SET first_name = ?, last_name = ?, email= ? WHERE customer_id = ?';
    var queryData = [params.first_name, params.las_name, params.email, params.customer_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.edit = function(customer_id, callback) {
    var query = 0;//'CALL school_getinfo(?)';
    var queryData = [customer_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};