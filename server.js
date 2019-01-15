import http from 'http';
import app from './app';
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port, () => {
    return console.log('Express app running on port 4000');
});
module.exports = server;
