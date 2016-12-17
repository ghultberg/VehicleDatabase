var express = require('express');
var router = express.Router();
var customer_dal = require('../model/customer_dal');


// View All customers
router.get('/all', function(req, res) {
    customer_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('customer/customerViewAll', { 'result':result });
        }
    });

});

// View the customer for the given id
router.get('/', function(req, res){
    if(req.query.customer_id == null) {
        res.send('customer_id is null');
    }
    else {
        customer_dal.getById(req.query.customer_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('customer/customerViewById', {'result': result});
            }
        });
    }
});

// Return the add a new customer form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    customer_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('customer/customerAdd', {'customer': result});
        }
    });
});

// insert a customer record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.first_name == null || req.query.last_name == null) {
        res.send('Name must be provided.');
    }
    else if(req.query.email == null) {
        res.send('Email must be provided');
    }

    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        customer_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax

                res.redirect(302, '/customer/all');
            }
        });
    }
});

// Delete a customer
router.get('/delete', function(req, res){
    if(req.query.customer_id == null) {
        res.send('customer_id is null');
    }
    else {
        customer_dal.delete(req.query.customer_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax

                res.redirect(302, '/customer/all');
            }
        });
    }
});


module.exports = router;
