const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const WasteAPI = require('./api/wasteplan-api');
const WastePlanService = require('./services/wasteplan-service');
const { Pool, Client } = require('pg');

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/wasteplan_db';

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

const wastePlanService = WastePlanService(pool);
const wasteAPI = WasteAPI(wastePlanService);

app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res, next) => {
  res.json({
    home: '<h1>Welcome: Code Invaders/Invasion(Not sure)</h1>'
  });
});



// app.get('/api/test', wasteAPI.all);


const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
});