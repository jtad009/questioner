import express from 'express';
import {listMeetups,upcoming,addMeetup,listMeetup} from '../controller/meetupsController';
const router = express.Router();


// api routes begin here
/**
 * @description Route to return a meetup based on it ID
 * @return  json array of all meetup
 */
router.get('/v1/', (request, response, next) => {
  const result = upcoming();
  response.status(200).json({
    status: 200,
    data: result,
  });
});
/**
 * @description Route to return a meetup based on it ID
 * @return  json array of all meetup
 */
router.get('/v1/upcoming', (request, response, next) => {
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
router.get('/v1/:id', (request, response, next) => {
  const result = listMeetups(false, request.params.id);
  if (result.length > 0) {
    response.status(200).json({
      status: 200,
      data: result,
    });
  } else {
    response.status(404).json({
      status: 404,
      data: 'invalid meetup id supplied',
    });
  }
});
/**
 * @description post new meetup record
 */
router.post('/v1/', (request, response, next) => {
  if (Object.keys(request.body).length > 0) {
    createMeetup(request.body); // create a new meetup
    const result = listMeetups(false, request.body.id); // fetch the newly created record
    if (result.length > 0) {
      response.status(200).json({
        status: 200,
        data: result,
      });
    } else {
      response.status(401).json({
        status: 401,
        data: 'invalid meetup id supplied',
      });
    }
  } else {
    response.status(404).json({
      status: 404,
      data: 'Sorry, meetup data cannot be empty',
    });
  }

});
/**
 * @description RSVP for a meetup route
 */
router.post('/v1/:id/rsvp', (request, response, next) => {
  const result = rsvp(request.params.id, request.body);

  if (result.length > 0) {
    response.status(200).json({
      status: 200,
      data: result,
    });
  } else {
    response.status(404).json({
      status: 404,
      data: 'invalid meetup id supplied',
    });
  }
});

router.post('/v2/',addMeetup);
router.get('/v2/',listMeetup);

module.exports = router;
