/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
const questions = [
  {
    id: 1,
    createdOn: '2018-09-12',
    createdBy: 1,
    meetup: 1,
    title: 'How to create data structures',
    body: 'How can i do this and that from time to time in the mix',
    votes: 10,
  },
  {
    id: 2,
    createdOn: '2018-09-12',
    createdBy: 1,
    meetup: 2,
    title: 'How to create data structures',
    body: 'How can i do this and that from time to time in the mix',
    votes: 10,
  },
];

/**
 * @description add questions for a particular meetup
 * @param jsonData data
 */
function add(data) {
  questions.push(data);
}
/**
 * @description list all meetup questions 
 * @param bool all should return all questions
 * @param int questionId optionally you can supply a question ID
 * @return array|0 an array of questions sorted by highest votes
 */
function listQuestions(all = true, questionId = 0) {
  const id = parseInt(questionId);
  let question = [];
  if (!all) {
    if (id > 0) {
      question = questions.filter(questionList => parseInt(questionList.id) === id);
    } else {
      return 0;
    }
  } else {
    question = questions.slice();
  }
  return question.sort((a, b) => Number(b.votes) - Number(a.votes));
}
/**
 * @description upvote a question
 * @param int questionId represents the question we want to upvote
 */
function upVote(questionId) {
  const id = parseInt(questionId);
  let question = [];
  if (id > 0) {
    question = questions.filter((meetupQuestions) => {
      if (meetupQuestions.id === id) {
        meetupQuestions.votes += 1;
        return true;
      }
      return false;
    });
  } else {
    return 0;
  }

  return question;
}
/**
 * @description downvote a question
 * @param int questionId represents the question we want to downvote
 */
function downVote(questionId) {
  const id = parseInt(questionId);
  let question = [];
  if (id > 0) {
    question = questions.filter((meetupQuestions) => {
      if (meetupQuestions.id === id) {
        meetupQuestions.votes -= 1;
        return true;
      }
      return false;
    });
  } else {
    return 0;
  }

  return question;
}


// Begin api routes
/**
 * @description api route to downvote a meetup question
 */
router.patch('/:id/down-vote', (request, response, next) => {
  const result = downVote(request.params.id);
  console.log(result.length);
  if (result.length > 0) {
    response.status(200).json({
      status: 200,
      data: result,
    });
  } else {
    response.status(404).json({
      status: 404,
      data: 'invalid question Id supplied',
    });
  }
});
/**
 * @description api route to upvote a meetup question
 */
router.patch('/:id/up-vote', (request, response, next) => {
  const result = upVote(request.params.id);
  if (result.length > 0) {
    response.status(200).json({
      status: 200,
      data: result,
    });
  } else {
    response.status(404).json({
      status: 404,
      data: 'invalid question Id supplied',
    });
  }
});
/**
 * @description api route to create a meetup question
 */
router.post('/', (request, response, next) => {
  add(request.body);
  const result = listQuestions(false, request.body.id); // fetch the newly created record
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
/**
 * @description api route to list a meetup question
 */
router.get('/', (request, response, next) => {
  const result = listQuestions(); // fetch the all questions
  response.status(200).json({
    status: '200',
    data: result,
  });
});

module.exports = router;
