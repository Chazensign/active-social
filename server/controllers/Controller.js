require('dotenv').config()
const axios = require('axios')
const { REACT_APP_GOOGLE_KEY } = process.env

module.exports = {
  getUsersFriends: async (req, res) => {
    const { id } = req.params
    if (id !== 0 && id !== 'undefined') {
      const db = await req.app.get('db')
      const friends = await db.get_users_friends(id)
      return res.status(200).send(friends)
    }
    return res.status(403).send({ message: 'Please login' })
  },

  getUsersEvents: async (req, res) => {
    const { pos, userId } = req.params
    const db = await req.app.get('db')
    const events = await db.get_users_events(userId)
    if (+pos !== 0) {
      const eventAddArr = await events.map(event => {
        const street = event.street.split(' ').join('+')
        const city = event.city.split(' ').join('+')
        const state = event.state
        return `${street}+${city}+${state}`
      })
      const reqString = eventAddArr.join('|')
      const result = await axios({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pos}&destinations=${reqString}=driving&key=${REACT_APP_GOOGLE_KEY}&units=imperial`
      })
      const distance = result.data.rows[0].elements
      const finalResult = await events.map((event, i) => ({
        ...event,
        distance: distance[i].distance.text
      }))
      return res.status(200).send(finalResult)
    } else {
      return res.status(200).send(events)
    }
  },

  getUsersActiv: async (req, res) => {
    const { userId } = req.params
    if (userId !== 0 && userId !== 'undefined') {
      const db = await req.app.get('db')
      let activ = await db.get_user_activ(userId)
      return res.status(200).send(activ)
    }
    return res.sendStatus(403)
  },

  findUsers: async (req, res) => {
    let zips = []
    const { zip, range } = req.query
    await axios({
      method: 'GET',
      url: `https://redline-redline-zipcode.p.rapidapi.com/rest/radius.json/${zip}/${range}/mile`,
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'redline-redline-zipcode.p.rapidapi.com',
        'x-rapidapi-key': '081774a6e5msh4f4368a8ec75111p146d89jsn6a74750310ae'
      }
    })
      .then(response => {
        zips = response.data.zip_codes.map(info => info.zip_code)
      })
      .catch(error => {
        console.log(error)
      })
    const db = await req.app.get('db')
    db.find_users_by_zip().then(async result => {
      let usersByZip = []
      filterUsers = async () => {
        for (let i = 0; i < zips.length; i++) {
          for (let j = 0; j < result.length; j++) {
            if (+zips[i] === +result[j].zip) {
              usersByZip.push(result[j])
            }
          }
        }
      }
      await filterUsers()

      let arrToSend = []
      for (let i = 0; i < usersByZip.length; i++) {
        let activs = await db.get_user_activ_ids(usersByZip[i].id)
        arrToSend.push({ userActivs: activs, user: usersByZip[i] })
      }
      res.status(200).send(arrToSend)
    })
  },
  getActivities: async (req, res) => {
    const db = await req.app.get('db')
    db.get_all_activities().then(result => res.status(200).send(result))
  },
  getMemeberInfo: async (req, res) => {
    const db = await req.app.get('db')
    db.get_member_info(req.params.id).then(result => {
      const userInfo = result[0]
      res.status(200).send(userInfo)
    })
  },
  activityPageInfo: async (req, res) => {
    const db = await req.app.get('db')
    let users = await db.get_users_by_activ(+req.params.id)
    let events = await db.get_events_by_activ(+req.params.id)
    let activ = await db.get_one_activ(+req.params.id)
    let instructors = await db.get_instructors(+req.params.id)

    res.status(200).send({
      users: users,
      events: events,
      activ: activ[0],
      instructors: instructors
    })
  },
  getActivEvents: async (req, res) => {
    const { pos, activ } = req.params
    const db = await req.app.get('db')
    const events = await db.get_events_by_activ(activ)
    if (+pos !== 0) {
      const eventAddArr = await events.map(event => {
        const street = event.street.split(' ').join('+')
        const city = event.city.split(' ').join('+')
        const state = event.state
        return `${street}+${city}+${state}`
      })
      const reqString = eventAddArr.join('|')
      const result = await axios({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pos}&destinations=${reqString}=driving&key=${REACT_APP_GOOGLE_KEY}&units=imperial`
      })
      const distance = result.data.rows[0].elements
      const finalResult = await events.map((event, i) => ({
        ...event,
        distance: distance[i].distance.text
      }))
      res.status(200).send(finalResult)
    } else {
      res.status(200).send(events)
    }
  },
  addEvent: async (req, res) => {
    const {
      eventDate,
      title,
      img,
      content,
      street,
      city,
      state,
      zip,
      activId
    } = req.body
    const db = await req.app.get('db')
    const events = await db.create_event(
      title,
      img,
      content,
      eventDate,
      req.session.user.userId,
      street,
      city,
      state,
      zip,
      activId
    )
    if (events[0]) {
      res.status(201).send({ message: 'Event Created.', data: events })
    } else {
      res.status(417).send({ message: 'Can not return events.' })
    }
  },
  addEventToUser: async (req, res) => {
    const { eventId } = req.params
    const { userId } = req.session.user
    const db = await req.app.get('db')
    db.save_event_to_user(eventId, userId).then(result => {
      let eventIds = result.map(event => event.event_id)
      res.status(200).send({ message: 'Following Event', events: eventIds })
    })
  },
  addFriend: async (req, res) => {
    const db = await req.app.get('db')
    db.add_friend(req.params.id, req.session.user.userId, false, req.params.id)
      .then(() => res.status(200).send({ message: 'Request Sent' }))
      .catch(err => res.sendStatus(500))
  },
  getFriendRequests: async (req, res) => {
    const db = await req.app.get('db')
    const requests = await db.get_requests(+req.params.id)
    res.status(200).send(requests)
  },
  confirmFriend: async (req, res) => {
    const db = await req.app.get('db')
    db.confirm_friend(req.params.id, req.session.user.userId).then(result =>
      res.status(200).send({ message: 'Connection Confirmed', friends: result })
    )
  },
  denyFriend: async (req, res) => {
    const db = await req.app.get('db')
    db.deny_friend(req.params.id, req.session.user.userId).then(result =>
      res.status(200).send(result)
    )
  },
  removeFriend: async (req, res) => {
    const db = await req.app.get('db')
    db.remove_friend(req.params.id, req.session.user.userId).then(result => {
      res.status(200).send(result)
    })
  },
  updateUser: async (req, res) => {
    const { firstName, lastName, email, city, state, zip, userId } = req.body
    const db = await req.app.get('db')
    db.update_user_info(firstName, lastName, email, city, state, zip, userId)
      .then(result => {
        const {
          first_name,
          last_name,
          profile_img,
          user_id,
          city,
          state,
          zip
        } = result[0]
        const user = {
          firstName: first_name,
          lastName: last_name,
          profilePic: profile_img,
          userId: user_id,
          city: city,
          state: state,
          zip: zip
        }
        req.session.user = user
        res.status(202).send({ message: 'Profile Updated', user: user })
      })
      .catch(err => console.log(err))
  },
  addActivs: async (req, res) => {
    const db = await req.app.get('db')
    const { userId } = req.session.user
    const { userActivs } = req.body
    userActivs.forEach(activ => {
      db.add_interests(
        activ.activId,
        userId,
        activ.activContent,
        activ.skillLevel,
        activ.lessons
      )
    })
    res.status(201).send({ message: 'Interests Added.' })
  },
  reduxFriends: async (req, res) => {
    const { userId } = req.params
    const db = await req.app.get('db')
    const friends = await db.get_redux_friends(userId)
    let friendIds = friends.map(friend => friend.second_id)
    res.status(200).send(friendIds)
  },
  deleteEvent: async (req, res) => {
    const { userId } = req.session.user
    const { eventId } = req.params
    const db = await req.app.get('db')
    db.delete_event(eventId, userId).then(result =>
      res.status(200).send(result)
    )
  },
  editEvent: async (req, res) => {
    const {
      eventId,
      title,
      img,
      content,
      eventDate,
      street,
      city,
      state,
      zip,
      userId
    } = req.body
    const db = await req.app.get('db')
    db.edit_event(
      eventId,
      title,
      img,
      content,
      eventDate,
      street,
      city,
      state,
      zip,
      userId
    ).then(result => {
      res.status(200).send(result)
    })
  },
  getEventLocation: async (req, res) => {
    let { street, city, state } = req.body
    street = street.replace(' ', '+')
    city = city.replace(' ', '+')
    state = state.replace(' ', '+')
    const result = await axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${street},+${city},+${state}&key=${REACT_APP_GOOGLE_KEY}`
    })
    res.status(200).send({
      location: result.data.results[0].geometry.location,
      street,
      city,
      state
    })
  },

  unfollowEvent: async (req, res) => {
    const { userId } = req.session.user
    const { eventId } = req.params
    const db = await req.app.get('db')
    db.unfollow_event(eventId, userId)
      .then(result => {
        let eventIds = result.map(event => event.event_id)
        res.status(200).send(eventIds)
      })
      .catch(err => console.log(err))
  }
}
