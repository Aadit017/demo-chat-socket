const express = require('express')
const path = require('path')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})

app.use(express.static(path.join(__dirname, '..', 'client', 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
})

server.listen(3000, () => {
    console.log('server started')
})

io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on('message',(data)=>{
        console.log(data);
        socket.broadcast.emit('message',data)
    })
})