require('dotenv').config()
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const express = require('express')
const app = express()
const massive = require('massive')
const authCtrl = require('./controllers/AuthController')
const ctrl = require('./controllers/Controller')
const session = require('express-session')
socket = require('socket.io')

var io = socket(
app.listen(SERVER_PORT, () => {
  console.log(`Self destruct in ${SERVER_PORT}`)
}))

app.use(express.json())

massive(CONNECTION_STRING).then(databaseConnection => {
    app.set('db', databaseConnection)
    console.log('Database Connected')
  })

app.get('/chat', function(req, res) {
  res.sendFile(__dirname + Chat)
})

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: SESSION_SECRET
  })
)

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logOut)
app.get('/api/user/:userId', ctrl.getUserPage)
app.post('/api/search', ctrl.findUsers)
app.get('/api/activities/:userId', ctrl.getUsersActiv)
app.get('/api/activities', ctrl.getActivities)
app.get('/api/friends/:id', ctrl.getUsersFriends)
app.get('/api/events/:userId', ctrl.getUsersEvents)
app.get('/chat', function(req, res) {
  res.status(200).send("hello")
})

io.on('connection', (socket) => {
  console.log('User connected')

  socket.on('join room', async data => {
    const { room } = data
    const db = app.get('db')
    // if (typeof room === 'object') {
      
    // }
    console.log('Room joined', room)
    let existingRoom = await db.check_room({ room: room })
    !existingRoom.length ? db.create_room({ room: room }) : null
    let messages = await db.fetch_message_history({ room: room })
    let roomsId = await db.get_room_id(room)
    roomsId = roomsId[0]
    socket.join(room)
    io.to(room).emit('room joined', {room: room, messages: messages, roomId: roomsId.room_id})
  })
  socket.on('message sent', async data => {
    
    const { room, roomId, userId, message } = data
    const db = app.get('db')
    await db.create_message(roomId, userId, message)
    let messages = await db.fetch_message_history({ room: room })
    io.to(data.room).emit('message dispatched', messages)
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected')
  })
})
      
