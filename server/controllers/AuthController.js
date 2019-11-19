const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    console.log(req.body)
    const {
      email,
      firstName,
      lastName,
      profilePic,
      city,
      state,
      zip,
      // birth_date,
      password
    } = req.body
    // if (new  Date().toString() - birth_date > 18)
    const db = req.app.get('db')
    const foundUser = await db.find_user(email)
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
      userId: userId,
      profilePic: user.profile_img,
      firstName: user.first_name,
      city: city,
      state: state,
      zip: zip
    }
    db.add_address(city, state, zip, userId)
    res
      .status(201)
      .send({
        message: 'Account created, you are logged in.',
        user: req.session.user
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
    const {
      first_name,
      last_name,
      profile_img,
      user_id,
      zip
    } = foundUser[0]
    const user = {
      firstName: first_name,
      lastName: last_name,
      profilePic: profile_img,
      userId: user_id,
      zip: zip
    }
    req.session.user = user
    res.status(200).send({message: 'Logged in.', user: user})
  },
  logOut: (req, res) => {}
}
