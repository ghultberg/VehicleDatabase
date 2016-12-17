var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 CREATE OR REPLACE VIEW vehicle_data AS
 SELECT * FROM vehicle v
 JOIN manufacturer m USING (manufacturer_id);
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM vehicle_data;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(vehicle_id, callback) {
    var query = 'SELECT * FROM vehicle_data WHERE vehicle_id = ?';
    var queryData = [vehicle_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO vehicle (manufacturer_id, model, model_year, price, horsepower, torque, curb_weight, mpg, cylinders) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.manufacturer_id, params.model, params.model_year, params.price, params.horsepower, params.torque,
        params.curb_weight, params.mpg, params.cylinders];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(vehicle_id, callback) {
    var query = 'DELETE FROM vehicle WHERE vehicle_id = ?';
    var queryData = [vehicle_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};