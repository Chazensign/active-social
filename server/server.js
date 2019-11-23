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
app.post('/auth/session', authCtrl.getSession)
app.get('/api/search', ctrl.findUsers)
app.get('/api/activities/:userId', ctrl.getUsersActiv)
app.get('/api/activities', ctrl.getActivities)
app.get('/api/friends/:id', ctrl.getUsersFriends)
app.get('/api/events/:userId', ctrl.getUsersEvents)
app.get('/api/member/:id', ctrl.getMemeberInfo)
app.get('/api/activity/:id', ctrl.activityPageInfo)
app.get('/chat', function(req, res) {
  res.status(200).send("hello")
})

io.on('connection', (socket) => {
  console.log('User connected')

  // socket.on('join room', async data => {
  //   let existingRoom 
  //   const { room } = data
  //   const db = app.get('db')
  //   if (typeof room === 'object') {
  //     const { room1, room2 } = room
  //     existingRoom = await db.check_for_two_rooms(room1, room2)
  //     !existingRoom.length
  //     ? existingRoom = await db.create_room({ room: room1 })
  //     : (existingRoom = existingRoom[0].room_name)
  //     console.log('Room joined', existingRoom)
  //     console.log(existingRoom)
  //   }else {
  //   console.log('Room joined', room, 'else')
  //   existingRoom = await db.check_room({ room: room })
  //   console.log(existingRoom)
  //   !existingRoom.length
  //     ? await db.create_room({ room: room })
  //     : (existingRoom = room)
  //   }
    
  //   let messages = await db.fetch_message_history({ room: existingRoom })
  //   let roomsId = await db.get_room_id(existingRoom)
  //   roomsId = roomsId[0]
  //   socket.join(existingRoom)
  //   io.to(existingRoom).emit('room joined', {
  //     room: existingRoom,
  //     messages: messages,
  //     roomId: roomsId.room_id
  //   })
  // })

  socket.on('join room', async data => {

    let existingRoom
    const { userId, userId2, activId } = data
    const db = app.get('db')
    if (userID && userId2) {
      existingRoom = await db.check_for_two_rooms(userId, userId2)
      !existingRoom.length
        ? (existingRoom = await db.create_room({ room: room1 }))
        : (existingRoom = existingRoom[0].room_name)
      console.log('Room joined', existingRoom)
      console.log(existingRoom)
    } else {
      console.log('Room joined', room, 'else')
      existingRoom = await db.check_room({ room: room })
      console.log(existingRoom)
      !existingRoom.length
        ? await db.create_room({ room: room })
        : (existingRoom = room)
    }

    let messages = await db.fetch_message_history({ room: existingRoom })
    let roomsId = await db.get_room_id(existingRoom)
    roomsId = roomsId[0]
    socket.join(existingRoom)
    io.to(existingRoom).emit('room joined', {
      room: existingRoom,
      messages: messages,
      roomId: roomsId.room_id
    })
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
      
