const axios = require('axios')

module.exports = {
  getUserPage: async (req, res) => {
    const { userId } = req.params
    const db = req.app.get('db')
    let userObj = { friends: friends, activities: activ, events: events }
    res.status(200).send(userObj)
  },

  getUsersFriends: async (req, res) => {
    const { id } = req.params
    if (id !== 0 && id !== undefined) {
      const db = req.app.get('db')
      const friends = await db.get_users_friends(id)
      res.status(200).send(friends)
    }
  },

  getUsersEvents: async (req, res) => {
    const { userId } = req.params
    const db = req.app.get('db')
    let events = await db.get_users_events(userId)
    res.status(200).send(events)
  },

  getUsersActiv: async (req, res) => {
    const { userId } = req.params
    const db = req.app.get('db')
    let activ = await db.get_user_activ(userId)
    res.status(200).send(activ)
  },

  findUsers: async (req, res) => {
    let zips = []
    const { zip, range, lessons, activ } = req.body
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
      .catch(error => {})
    const db = req.app.get('db')
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
  }
}
