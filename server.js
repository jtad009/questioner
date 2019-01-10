const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port, () => {
    return console.log('Express app running on port 4000');
});
module.exports = server;
