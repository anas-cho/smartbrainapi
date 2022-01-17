const handleSignin = (dbk, bcrypt) => (req, res) => {
  const {email, password} = req.body;
  dbk('login').select('*').where('email', '=', email).returning('hash')
  .then(hash => {
    const isValid = bcrypt.compareSync(password, hash[0].hash);
    if(isValid) {
      dbk('users').select('*').where('email', '=', email).returning('*')
      .then(user => {
        res.status(200).json(user[0])
      })
      .catch(err => res.status(400).json('unable to get user'))
    } else {
      res.status(400).json('wrong credentials')
    }
  })
  .catch(err =>   res.status(400).json('wrong credentials'))
};

module.exports = {
  handleSignin
}