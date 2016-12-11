var express = require('express');
var router = express.Router();
var vehicle_dal = require('../model/vehicle_dal');


// View All accounts
router.get('/all', function(req, res) {
    vehicle_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('vehicle/vehicleViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.vehicle_id == null) {
        res.send('vehicle_id is null');
    }
    else {
        vehicle_dal.getById(req.query.vehicle_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('vehicle/vehicleViewById', {'result': result});
            }
        });
    }
});

// Return the add a new school form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    vehicle_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('vehicle/vehicleAdd', {'vehicle': result});
        }
    });
});

// insert a school record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.model == null) {
        res.send('Model must be provided.');
    }
    else if(req.query.model_year == null) {
        res.send('model_year must be provided');
    }
    else if(req.query.price == null) {
        res.send('Price must be provided');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        account_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/vehicle/all');
            }
        });
    }
});

// Delete a school for the given school_id
router.get('/delete', function(req, res){
    if(req.query.vehicle_id == null) {
        res.send('vehicle_id is null');
    }
    else {
        vehicle_dal.delete(req.query.vehicle_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/vehicle/all');
            }
        });
    }
});


module.exports = router;

