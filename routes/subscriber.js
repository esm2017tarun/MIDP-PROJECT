var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({ contactPoints: ['172.16.17.99']});
client.connect(function(err,result){
        console.log('index: cassandra connected');
});

var getSubscriberById = 'SELECT * FROM people.subscribers WHERE id = ?'; 

/* GET users listing. */
router.get('/:id', function(req, res) {
  client.execute(getSubscriberById,[req.params.id],function(err,result){
	  if(err){
                res.status(404).send({msg:err});
          } else {
                res.render('subscriber',{
			id: result.rows[0].id,
			email: result.rows[0].email,
			first_name: result.rows[0].first_name,
			last_name: result.rows[0].last_name, 
                  })

//var util  = require('util');
//console.log(util.inspect(result));
          }
      });
});

module.exports = router;
