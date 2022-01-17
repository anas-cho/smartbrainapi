const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: "64133e880fd644819d5e597a56531678",
});

const handleImage = (dbk) => (req, res)=> {
  const { id } = req.body
  dbk('users').returning('entries').where({id}).increment('entries', 1)
  .then(count => {
    console.log(count);
    res.status(200).json(count[0])
  })
  .catch(err => res.status(400).json('error fetching entries'))
};

const handleImageUrl = (req, res) => {
  app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
      .then(data => {
        res.json(data)
      })
      .catch(err => res.status(400).json('error with clarifai'))
}

module.exports = {
  handleImage,
  handleImageUrl
}