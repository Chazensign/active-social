const path = require('path')
require('dotenv').config()
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const express = require('express')
const app = express()
const massive = require('massive')
const authCtrl = require('./controllers/AuthController')
const ctrl = require('./controllers/Controller')
const session = require('express-session')
socket = require('socket.io')

massive(CONNECTION_STRING).then(databaseConnection => {
  app.set('db', databaseConnection)
  console.log('Database Connected')
})

app.use(express.json())
app.use(express.static(`${__dirname}/../build`))

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: SESSION_SECRET
  })
)

var io = socket(
  app.listen(SERVER_PORT, () => {
    console.log(`Self destruct in ${SERVER_PORT}`)
  })
)
app.enable('trust proxy')
app.get('trust proxy')
app.get('/chat', function(req, res) {
  res.sendFile(__dirname + Chat)
})

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logOut)
app.post('/auth/session', authCtrl.getSession)
app.put('/api/user/update', ctrl.updateUser)
app.get('/api/member/:id', ctrl.getMemeberInfo)
app.get('/api/search', ctrl.findUsers)
app.post('/api/friends/:id', ctrl.addFriend)
app.get('/api/friends/:id', ctrl.getUsersFriends)
app.delete('/api/friends/:id', ctrl.removeFriend)
app.get('/api/friend/requests/:id', ctrl.getFriendRequests)
app.put('/api/friend/request/:id', ctrl.confirmFriend)
app.delete('/api/friend/request/:id', ctrl.denyFriend)
app.get('/api/friends/redux/:userId', ctrl.reduxFriends)
app.get('/api/activities/:userId', ctrl.getUsersActiv)
app.get('/api/activities', ctrl.getActivities)
app.post('/api/activities', ctrl.addActivs)
app.get('/api/activity/events/:activ/pos/:pos', ctrl.getActivEvents)
app.get('/api/activity/:id', ctrl.activityPageInfo)
app.get('/api/events/info/:userId/:pos', ctrl.getUsersEvents)
app.delete('/api/event/:eventId', ctrl.deleteEvent)
app.post('/api/user/events/:eventId', ctrl.addEventToUser)
app.delete('/api/user/events/:eventId', ctrl.unfollowEvent)
app.put('/api/events', ctrl.editEvent)
app.post('/api/events', ctrl.addEvent)
app.post('/api/google/location', ctrl.getEventLocation)
app.get('/chat', function(req, res) {
  res.status(200).send('hello')
})

io.on('connection', async socket => {
  console.log('User connected')
  socket.on('join room', async data => {
    const db = await app.get('db')
    let existingRoom
    let roomId
    const { userId, userId2, activId } = data
    try {
      roomIdNum = async () => {
        if (activId) {
          existingRoom = await db.check_for_activ_room(activId)
          !existingRoom.length
            ? (existingRoom = await db.create_activ_room(activId))
            : null
          roomId = existingRoom[0].room_id
          console.log('Activity Room Joined', roomId)
          return roomId
        } else if (userId && userId2) {
          existingRoom = await db.check_for_private_room(userId, userId2)
          !existingRoom.length
            ? (existingRoom = await db.create_private_room(userId, userId2))
            : null
          roomId = existingRoom[0].room_id
          console.log('Private Room joined', roomId)
          return roomId
        } else if (userId) {
          existingRoom = await db.check_for_user_room(userId)
          !existingRoom.length
            ? (existingRoom = await db.create_user_page_room(userId))
            : null
          roomId = existingRoom[0].room_id
          console.log('User Page Room joined', roomId)
          return roomId
        }
      }
    } catch (err) {
      console.log(err)
    }
    roomId = await roomIdNum()
    let messages = await db.fetch_message_history(roomId)
    socket.join(roomId)
    io.to(roomId).emit('room joined', {
      messages: messages,
      roomId: roomId
    })
  })
  socket.on('message sent', async data => {
    const { roomId, userId, message } = data
    const db = app.get('db')
    await db.create_message(roomId, userId, message)
    let messages = await db.fetch_message_history(roomId)
    io.to(roomId).emit('message dispatched', messages)
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected')
  })
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})
