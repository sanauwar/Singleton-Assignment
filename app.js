const { app, port } = require('./config/express')


app.listen(port, () => {
    console.log('port is listning', port);
})