var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM order_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(order_id, callback) {
    var query = 'SELECT * FROM order_view WHERE order_id = ?';
    var queryData = [order_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO sale_order (date_purchased, sale_price, customer_id, vehicle_id, dealership_id, employee_id) ' +
        'VALUES (?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.date_purchased, params.sale_price, params.customer_id, params. vehicle_id, params.dealership_id,
    params.employee_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(order_id, callback) {
    var query = 'DELETE FROM sale_order WHERE order_id = ?';
    var queryData = [order_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE sale_order SET date_purchased = ?, sale_price = ?, customer_id = ?,' +
        'vehicle_id = ?, dealership_id = ?, employee_id = ? WHERE order_id = ?';
    var queryData = [params.date_purchased, params.sale_price, params.customer_id, params. vehicle_id, params.dealership_id,
        params.employee_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.edit = function(order_id, callback) {
    var query = 0;//'CALL school_getinfo(?)';
    var queryData = [order_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};