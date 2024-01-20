const express = require('express');
const fs = require('fs/promises');
const { MongoClient } = require('mongodb');
const uri = "mongodb://mongohost";
const app = express();
const session = require('express-session');
const router_api = require('./rest_api.js');
const client = new MongoClient(uri);
let db = null;
const {initializeDatabase} = require('./initialize_database.js');

app.use(session({
    secret: 'segreto',
    resave: false
}));
app.get('/', verifyUser);
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded());
app.use('/api', router_api);

function verifyUser(req, res, next){
  try{
      if(req.session.user){
          return next();
      } else {
          res.redirect('/signin');
      }
  } catch (err) {
      res.redirect('/signin');
  }
};

app.get("/signin", async (req, res) => {
    try {
        req.session.user = null;
        const data = await fs.readFile(`${__dirname}/public/signin.html`, { encoding: 'utf8' });
        res.send(data);
      } catch (err) {
        console.log(err);
      }
});

app.get("/signup", async (req, res) => {
    try {
        const data = await fs.readFile(`${__dirname}/public/signup.html`, { encoding: 'utf8' });
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

app.listen(3000, async () => {
    await client.connect();
    db = client.db("expenses");
    await initializeDatabase();
});
