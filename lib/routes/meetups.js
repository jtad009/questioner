import express from 'express';
const router = express.Router();
const MEETUPS = [
  {
    tags: ['Events', 'Meetsups', 'Andela', 'Hackerton'],
    id: 1,
    createdOn: 'Sun . 10:40 PM . 14/12/14',
    location: 'lagos',
    images: [],
    topic: 'Hackerton in yaba',
    happeningOn: '2018-09-20',

  },
  {
    tags: ['Events', 'Meetsups', 'Andela', 'Hackerton'],
    id: 2,
    createdOn: 'Sun . 10:40 PM . 14/12/14',
    location: 'lagos',
    images: ['http://localhost:5000/images/54620ef4a1a3e.JPG'],
    topic: 'Hackerton in yaba',
    happeningOn: '2018-09-21',
  },
];
const RSVPS = [
  {
    meetup: 1,
    topic: 'Hackerton in yaba',
    status: 'no', // [yes,no,maybe]
  },
];
  /**
   * @description List all meetup available
   * @param bool all - if true then return all meetups saved else return meetup with specified ID
   * @param int meetup
   * @returns array|false
   */
function listMeetups(all = true, meetup_id = 0) {
  const id = parseInt(meetup_id);// if ID is received make sure it's and integer
  let meetup = [];// temporary array to ensure that out global list isnt over-written
  if (!all) {
    if (id > 0) {
      meetup = MEETUPS.filter(meetupLists => parseInt(meetupLists.id) === id);
    } else {
      return 0;
    }
  } else {
    meetup = MEETUPS.slice();
  }
  return meetup;
}
/**
 * @description this function creates a new meetup
 * @param json object data
 */
function createMeetup(data) {
  MEETUPS.push(data);
}
/**
 * @description rsvp for a meetup if it exists in the data structure
 * @param int meetupId
 * @param jsonObject data
 * @returns array|0
 */
function rsvp(meetupId, data) {
  let rsvp = [];
  // check if the meetup id exist then update rsvp
  const meetupExist = MEETUPS.some(item => item.id === parseInt(meetupId));
  if (meetupExist) {
    RSVPS.push(data);// push rsvp if meetup exist
    rsvp = RSVPS.filter(rsvp => rsvp.meetup === parseInt(meetupId));
    return rsvp;
  }
  return 0;
}
/**
 * @descriptions should search array for meetups with date closest to today
 * @returns array
 */
function getAllUpcoming() {
  // should search array for meetups with date < one week from today
  return MEETUPS.sort((a, b) => Number(new Date(b.happeningOn)) - Number(new Date(a.happeningOn)));
}

// api routes begin here
/**
 * @description Route to return a meetup based on it ID
 * @return  json array of all meetup
 */
router.get('/', (request, response, next) => {
  const result = listMeetups();
  response.status(200).json({
    status: 200,
    data: result,
  });
});
/**
 * @description Route to return a meetup based on it ID
 * @return  json array of all meetup
 */
router.get('/upcoming', (request, response, next) => {
  const result = getAllUpcoming();
  response.status(200).json({
    status: 200,
    data: result,
  });
});
/**
 * @description Route to return a meetup based on it ID
 * @param int id Meetup ID
 * @return json array of the single item
 */
router.get('/:id', (request, response, next) => {
  const result = listMeetups(false, request.params.id);
  if (result.length > 0) {
    response.status(200).json({
      status: 200,
      data: result,
    });
  } else {
    response.status(404).json({
      status: '404',
      data: 'invalid meetup id supplied',
    });
  }
});
/**
 * @description post new meetup record
 */
router.post('/', (request, response, next) => {
  createMeetup(request.body); // create a new meetup
  const result = listMeetups(false, request.body.id); // fetch the newly created record
  if (result.length > 0) {
    response.status(200).json({
      status: 200,
      data: result,
    });
  } else {
    response.status(404).json({
      status: '404',
      data: 'invalid meetup id supplied',
    });
  }
});
/**
 * @description RSVP for a meetup route
 */
router.post('/:id/rsvp', (request, response, next) => {
  const result = rsvp(request.params.id, request.body);
  
  if (result.length > 0) {
    response.status(200).json({
      status: '200',
      data: result,
    });
  } else {
    response.status(404).json({
      status: '404',
      data: 'invalid meetup id supplied',
    });
  }
});

module.exports = router;