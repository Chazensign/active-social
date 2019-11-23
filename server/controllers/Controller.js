const axios = require('axios')

module.exports = {

  getUsersFriends: async (req, res) => {
    const { id } = req.params
    if (id !== 0 && id !== 'undefined') {
      const db = await req.app.get('db')
      const friends = await db.get_users_friends(id)
      return res.status(200).send(friends)
    }
    return res.status(403).send({message: 'Please login'})
  },

  getUsersEvents: async (req, res) => {
    const { userId } = req.params
    const db = await req.app.get('db')
    let events = await db.get_users_events(userId)
    if (events) return res.status(200).send(events)
    return res.sendStatus(403)
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
    const { zip, range} = req.query
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
      .catch((error) => {console.log(error)})
    const db = await req.app.get('db')
    db.find_users_by_zip().then(async result => {
      let usersToSend = []
      filterUsers = async () => {
        for (let i = 0; i < zips.length; i++) {
          for (let j = 0; j < result.length; j++) {
            if (+zips[i] === +result[j].zip) {
              usersToSend.push(result[j])
            }
          }
        }
      }
      await filterUsers()
      res.status(200).send(usersToSend)
    })
  },
  getActivities: (req, res) => {
    const db = req.app.get('db')
    db.get_all_activities().then(result => res.status(200).send(result))
  },
  getMemeberInfo: (req, res) => {
    const db = req.app.get('db')
    db.get_member_info(req.params.id)
    .then(result => {
      const userInfo = result[0]
      res.status(200).send(userInfo)
    })
  },
  activityPageInfo: async(req, res) => {
    const db = await req.app.get('db')
    let actId = +req.params.id
    console.log(typeof +req.params.id,'before users')
    let users = await db.get_users_by_activ(+req.params.id)
    console.log(req.params.id, users)
    let events = await db.get_events_by_activ(+req.params.id)
    console.log(events)
    let activ = await db.get_one_activ(+req.params.id)
    console.log(activ)
    let instructors = await db.get_instructors(+req.params.id)
    console.log(instructors);
    
    res.status(200).send({users: users, events: events, activ: activ[0], instructors: instructors})
  }
}
