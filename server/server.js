require('dotenv').config()
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const express = require('express')
const app = express()
const massive = require('massive')
const authCtrl = require('./controllers/AuthController')
const ctrl = require('./controllers/Controller')
const awsCtrl = require('./AWSS3')
const session = require('express-session')
const { DynamoDB } = require('@aws-sdk/client-dynamodb-v2-node')
socket = require('socket.io')

async function example() {
  const client = new DynamoDB({ region: 'us-west-2' })
  try {
    const results = await client.listTables({})
    console.log(results.TableNames.join('\n'))
  } catch (err) {
    console.error(err)
  }
}
massive(CONNECTION_STRING).then(databaseConnection => {
  app.set('db', databaseConnection)
  console.log('Database Connected')
})

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(express.json())

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
app.get('/api/search', ctrl.findUsers)
app.get('/api/activities/:userId', ctrl.getUsersActiv)
app.get('/api/activities', ctrl.getActivities)
app.post('/api/friends/:id', ctrl.addFriend)
app.get('/api/friends/:id', ctrl.getUsersFriends)
app.get('/api/friend/requests/:id', ctrl.getFriendRequests)
app.put('/api/friend/request/:id', ctrl.confirmFriend)
app.get('/api/events/:userId', ctrl.getUsersEvents)
app.get('/api/activity/events/:id', ctrl.getActivEvents)
app.post('/api/events', ctrl.addEvent)
app.get('/api/member/:id', ctrl.getMemeberInfo)
app.get('/api/activity/:id', ctrl.activityPageInfo)
app.get('/chat', function(req, res) {
  res.status(200).send('hello')
})

app.get('/api/images', awsCtrl.signedUrl)

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
