var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Vehicle Database Application' });
});

router.get('/about', function(req, res) {
    res.render('about.ejs', {local: req});
});

module.exports = router;
