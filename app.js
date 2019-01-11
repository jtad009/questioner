import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import questionsRoutes from './lib/routes/questions';
import meetupsRoutes from './lib/routes/meetups';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
 *@param request
 *@param response
 *@param next action to take
 */
app.use((_req, res, next) => {
  next();
});
app.use(express.static('./public'));
app.use(cors());
/* CORS HEADER SETTING*/

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers',
    'Origin, X-Rquested-With, Content-Type, Accept,Authorization');
  if (request.method === 'OPTIONS') {
    response.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return response.status(200).json({});
  }
  next();
});
app.use('/api/v1/meetups', meetupsRoutes);
app.use('/api/v1/questions', questionsRoutes);
module.exports = app;
