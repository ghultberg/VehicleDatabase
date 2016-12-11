var express = require('express');
var router = express.Router();
var manufacturer_dal = require('../model/manufacturer_dal');


// View All accounts
router.get('/all', function(req, res) {
    manufacturer_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('manufacturer/manufacturerViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.manufacturer_id == null) {
        res.send('manufacturer_id is null');
    }
    else {
        manufacturer_dal.getById(req.query.manufacturer_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('manufacturer/manufacturerViewById', {'result': result});
            }
        });
    }
});

// Return the add a new school form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    manufacturer_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('manufacturer/manufacturerAdd', {'manufacturer': result});
        }
    });
});

// insert a school record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.name == null) {
        res.send('Name must be provided.');
    }
    else if(req.query.country == null) {
        res.send('Country must be provided');
    }

    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        manufacturer_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/manufacturer/all');
            }
        });
    }
});

// Delete a school for the given school_id
router.get('/delete', function(req, res){
    if(req.query.manufacturer_id == null) {
        res.send('manufacturer_id is null');
    }
    else {
        manufacturer_dal.delete(req.query.manufacturer_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/manufacturer/all');
            }
        });
    }
});


module.exports = router;
