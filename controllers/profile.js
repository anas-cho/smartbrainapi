const handleProfile = (dbk) => (req, res)=> {
  const { id } = req.params
  dbk.select('*').from('users').where({id})
  .then(user => {
    if(user.length){
      res.status(200).json(user[0])
    } else {
      res.status(400).json('user not found')
    }
  })
  .catch(err => res.status(400).json('could not search user'))
};

module.exports = {
  handleProfile
}