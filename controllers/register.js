const handleRegister = (dbk, bcrypt) => (req, res)=> {
  const {email, name, password} = req.body;
  const hash = bcrypt.hashSync(password);

  dbk.transaction(trx => {
    trx('login').returning('email').insert({
      email:email,
      hash: hash
    })
    .then(loginemail => {
      return trx('users').returning('*').insert({
        email: loginemail[0],
        name: name,
        joined: new Date()
      })
      .then(user => {
        res.status(200).json(user[0])
      })
    })
    .then(trx.commit)
    .catch(trx.rollback);
  })
  .catch(err => res.status(400).json('could not register users'))
}

module.exports = {
  handleRegister
}