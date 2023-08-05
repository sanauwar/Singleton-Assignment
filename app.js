const { app, port } = require('./config/express')


// app.post('/test', (req, res) => {
//     const body = req.body
//     res.send({ data: body, message: "Post is working" });
// })

app.listen(port, () => {
    console.log('port is listning', port);
})