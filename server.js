const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const dbk = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'anas',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());



app.get('/', (req, res)=> res.send('it is working'))

app.post('/signin', signin.handleSignin(dbk, bcrypt))

app.post('/register', register.handleRegister(dbk, bcrypt)) 

app.get('/profile/:id', profile.handleProfile(dbk))

app.put('/image', image.handleImage(dbk))

app.post('/imageurl', image.handleImageUrl)

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})