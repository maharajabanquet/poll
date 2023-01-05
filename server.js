require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();
const port = 4000;
const pusher = new Pusher({
 appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'eu',
  encrypted: true,
  cluster: "ap2",
  useTLS: true
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.static(process.cwd()+"/dist/"));
app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/dist/index.html")
  });

app.post('/vote', (req, res) => {
  const { body } = req;
  const { player } = body;

  pusher.trigger('vote-channel', 'vote', {
    player,
  });
  console.log(player);
  res.json({ player });
});

app.post('/stop', (req, res) => {
  const player = false;

  pusher.trigger('stop-channel', 'stop', {
    player,
  });
  res.json({ player });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
