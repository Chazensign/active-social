require('dotenv').config()
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const express = require('express')
const massive = require('massive')
const authCtrl = require('./controllers/AuthController')
const ctrl = require('./controllers/Controller')
const session = require('express-session')


app = express()
app.use(express.json())

app.use(session({
  resave: false,
  saveUninitalized: false,
  secret: SESSION_SECRET
}))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logOut)


massive(CONNECTION_STRING).then(databaseConnection => {
  app.set('db', databaseConnection)
  console.log('Database Connected')
  app.listen(SERVER_PORT, () => console.log(`Self destruct in ${SERVER_PORT}`))
})