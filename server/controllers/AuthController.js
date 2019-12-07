const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const {
      email,
      firstName,
      lastName,
      profilePic,
      city,
      state,
      zip,
      birthDate,
      password,
      userActivs
    } = req.body
    // if (new  Date().toString() - birth_date > 18) res.status(451).send({message: 'You must be at least 18 years old to register.'})
    const db = req.app.get('db')
    const foundUser = await db.retrieve_user(email)
    if (foundUser.length > 0) {
      return res
        .status(409)
        .send({ message: 'Email already registered, try logging in.' })
    }
    let user = await db.add_user(firstName, lastName, email, profilePic)
    user = user[0]
    const userId = user.id
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    db.add_hash(userId, hash)
    req.session.user = {
      firstName: firstName,
      lastName: lastName,
      profilePic: profilePic,
      userId: userId,
      zip: zip
    }
    userActivs.forEach(activ => {
      db.add_interests(activ.activId, userId, activ.activContent, activ.skillLevel, activ.lessons)
    })
    db.add_address(city, state, zip, userId)
    res
      .status(201)
      .send({
        message: 'Account created, you are logged in.',
        user: req.session.user,
        userActivs: userActivs
      })

  },
  login: async (req, res) => {
    const { email, password } = req.body
    const db = req.app.get('db')
    const foundUser = await db.retrieve_user(email)
    if (foundUser.length === 0) {
      return res
        .status(404)
        .send({ message: 'Email address not found, try registering.' })
    }
    
    const foundHash = await db.find_hash(foundUser[0].id)
    const result = await bcrypt.compareSync(password, foundHash[0].hash)
    
    if (result === true) {
      const {
        first_name,
        last_name,
        profile_img,
        user_id,
        zip
      } = foundUser[0]
      const friends = await db.get_redux_friends(user_id)
      const friendIds = friends.map(friend => friend.second_id)
      friendIds.push(user_id)
      let events = await db.get_redux_events(user_id)
      events = events.map(event => event.event_id)
      const user = {
        firstName: first_name,
        lastName: last_name,
        profilePic: profile_img,
        userId: user_id,
        zip: zip,
        friends: friendIds,
        events: events
      }
      req.session.user = user
      res
        .status(200)
        .send({
          message: 'Logged in.',
          user: { ...user}
        })
    } else {
      res.status(406).send({ message: 'Password incorrect' })
    }
  },
  logOut: (req, res) => {
    req.session.destroy()
    res.status(200).send({message: 'Logged Out'})
  },

  getSession: (req, res) => {
    if (req.session.user) {
      const user = {...req.session.user}
      return res.status(200).send({user: user})
    }
    res.status(404).send({message: 'Session not found'})
  }
}
