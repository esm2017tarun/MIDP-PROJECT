var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({ contactPoints: ['172.16.17.99']});
client.connect(function(err,result){
        console.log('addsubscriber: cassandra connected');
});

/* GET users listing. */
router.get('/', function(req, res) {
	res.render('addsubscriber');
});

/* POST add Subscriber */

router.post('/', function(req, res){
	console.log('Hello subscriber')
	id = cassandra.types.uuid();
	
	var upsertSubscriber = 'INSERT INTO people.subscribers (id, email, first_name, last_name) VALUES(?,?,?,?)';
	

	client.execute(upsertSubscriber, [id, req.body.email, req.body.first_name, req.body.last_name],
		function(err, result){
			if(err){
        		res.status(404).send({msg: err});
        	} else {
	        	console.log('Subscriber Added');
			res.redirect('/');
		        	
		}
		
	});
});

module.exports = router;
