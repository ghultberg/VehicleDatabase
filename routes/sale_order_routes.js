var express = require('express');
var router = express.Router();
var sale_order_dal = require('../model/sale_order_dal');


// View All orders
router.get('/all', function(req, res) {
    sale_order_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('sale_order/sale_orderViewAll', { 'result':result });
        }
    });

});

// View the order for the given id
router.get('/', function(req, res){
    if(req.query.order_id == null) {
        res.send('order_id is null');
    }
    else {
        sale_order_dal.getById(req.query.order_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('sale_order/sale_orderViewById', {'result': result});
            }
        });
    }
});

// Return the add a new order form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    sale_order_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('sale_order/sale_orderAdd', {'sale_order': result});
        }
    });
});



router.get('/delete', function(req, res){
    if(req.query.order_id == null) {
        res.send('order_id is null');
    }
    else {
        sale_order_dal.delete(req.query.order_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax

                res.redirect(302, '/sale_order/all');
            }
        });
    }
});


module.exports = router;
