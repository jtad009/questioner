var meetups = [
	{
		tags:['Events','Meetsups','Andela','Hackerton'],
		id:1,
		createdOn:"Sun . 10:40 PM . 14/12/14",
		location:"lagos",
		images:[],
		topic:"Hackerton in yaba",
		happeningOn:"2018-09-12"

	},
	{
		tags:['Events','Meetsups','Andela','Hackerton'],
		id:2,
		createdOn:"Sun . 10:40 PM . 14/12/14",
		location:"lagos",
		images:['http://localhost:5000/images/54620ef4a1a3e.JPG'],
		topic:"Hackerton in yaba",
		happeningOn:"2018-09-12"

	}
];
var rsvps = [
	{
		meetup:1,
		topic:"Hackerton in yaba",
		status:'no' //[yes,no,maybe]
	}
];
module.exports = {

	meetup_list(){
		return  meetups;
	},

	rsvp_list(){
		return  rsvps;
	},
	view(all,meetup_id= 0){
		var id = parseInt(meetup_id);
		var meetup = [];
		if(!all){
			if(id > 0){
				meetup = meetups.filter(function(meetup_lists){
					return parseInt(meetup_lists.id) == id;
				});
				meetup = {status:200,data:meetup};
			}else{
				return {status:404,information:'Invalid ID set'};
			}

		}else{

			meetup = {status:200,data:meetups.slice()};
		}
		return meetup;
	},
	//create meetups
	create(data){
		meetups.push(data);
		return this.view(true,0);
	},

	upcoming(date){

},
	list_rsvps(){
		return {status:200,data:rsvps};
	},

	rsvp(meetup_id,data){
	var rsvp = [];
	//check if the meetup id exist then update rsvp
	var meetup_exist = meetups.some(item => item.id === parseInt(meetup_id))
	console.log(meetup_exist);
	if(meetup_exist){
		rsvps.push(data);//push rsvp if meetup exist
		rsvp =  rsvps.filter(function(rsvp){
			return rsvp.meetup == parseInt(meetup_id);
		});
		return {status:200,data:rsvp};
	}else{
		return {status:404,data:'Invalid meetup ID.'};
	}

}
}