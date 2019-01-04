var questions = [
	{
		"id":1,
		"createdOn":"2018-09-12",
		"createdBy":1,
		"meetup":1,
		"title":"How to create data structures",
		"body":"How can i do this and that from time to time in the mix",
		"votes":10
	},{
		"id":2,
		"createdOn":"2018-09-12",
		"createdBy":1,
		"meetup":2,
		"title":"How to create data structures",
		"body":"How can i do this and that from time to time in the mix",
		"votes":10
	}
];
module.exports = {
	add(data){
	questions.push(data);
	return this.view(true,0);
},

view(all,question_id){
	var id = parseInt(question_id);
	var question= [];
	if(!all){
		if(id > 0){
			question = questions.filter(function(questions){
				return parseInt(questions.id) == id;
			});
			question = {status:200,data:question};
		}else{
			return {status:404,information:'invalid information supplied'};
		}

	}else{
		question = {status: 200, data:questions.slice()};
	}
	return question;
},
vote(question_id){
	var id = parseInt(question_id);
	var question = [];
	if(id > 0){
		question = questions.filter(function(meetup_questions){
			if(meetup_questions.id == id){
				meetup_questions.votes +=1;
				return true;
			}else{
				question = {status:404,information:'invalid ID supplied'};
				return false;
			}

		});
	}else{
		return {status:404,information:'invalid information supplied'};
	}
	question = {status:200,data:question};
	return question;
},
down_vote(question_id){
	var id = parseInt(question_id);
	var question = [];
	if(id > 0){
		question = questions.filter(function(meetup_questions){
			if(meetup_questions.id == id){
				meetup_questions.votes -=1;
				return true;
			}else{
				question = {status:404,information:'invalid ID supplied'};
				return false;
			}
		});
	}else{
		return {status:404,information:'invalid information supplied'};
	}
	question = {status:200,data:question};
	return question;
},
}
