var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var questions = require('./lib/questions');
var meetups = require('./lib/meetups');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//log every request using our middleware function before proceeding to the express middleware
/*
 *@param request
 *@param response
 *@param next action to take
 */
app.use(function(request,response,next){
	//console.log(` ${request.method} request for '${request.url}' - ${JSON.stringify(request.body)}`);
	next();//goto next middleware

});

//create file server folder
app.use(express.static('./public'));
app.use(cors());
/**
 *add a meetup
 */
app.post('/api/v1/meetups/',function(request,response){
	response.json(meetups.create(request.body));
});
/**
 *Delete a meetup
 *
 **/
app.delete('/api/v1/meetups/:id',function(request,response){
	console.log(request.params);
	meetups = meetups.filter(function(meetup_list){
		console.log('New Meetups: '+meetup_list.id+' ID to delete: '+request.params.id);
		console.log(parseInt(meetup_list.id) !== request.params.id);
		return parseInt(meetup_list.id) != request.params.id;
	});
	response.json(meetups);
});
/*
 *get meetup by id
 */
app.get('/api/v1/meetups/:id',function(request,response){
	response.json(meetups.view(false,request.params.id));
});
/**
 *List all meetups
 */
app.get('/api/v1/meetups/',function(request,response){
	var data = meetups.view(true);

	response.json(data);
});

/**
 *List all meetups upcoming
 */
app.get('/api/v1/meetups/upcoming/',function(request,response){

});
/**
 *List all meetups questions
 */
app.get('/api/v1/questions/',function(request,response){
	response.json(questions.view(true,0));
});
/**
 *post meetups questions
 */
app.post('/api/v1/questions/',function(request,response){
	response.json(questions.add(request.body));
});
/**
 *Vote meetup questions
 */
app.patch('/api/v1/questions/:id/upvote',function(request,response){
	response.json(questions.vote(request.params.id));
});
/**
 *Downvote meetup questions
 */
app.patch('/api/v1/questions/:id/downvote',function(request,response){
	response.json(questions.down_vote(request.params.id));
});

/**
 *	RSVP meetup
 */
app.post('/api/v1/meetups/:id/rsvps',function(request,response){
	//rsvps.push(request.body);
	response.json(meetups.rsvp(request.params.id,request.body));
});
//listen on port 5000
app.listen(5000);

console.log("Express app running on port 5000");
module.exports = app; //this allow for this files inclusion in other modules
