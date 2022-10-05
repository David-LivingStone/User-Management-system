const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//const Connection = require('mysql/lib/Connection');
const routes = require('./routes/userRoute');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//Parse application/json
app.use(bodyParser.json());

//Static files
app.use(express.static('public'));

//Templating Engine
app.engine('hbs', exphbs.engine( {extname: '.hbs'}));
app.set('view engine', 'hbs');




const pool = mysql.createPool({
    connectionLimit : 100,
    host            : "localhost",
    user            : "root",
    password        : '',
    database        : "user_manager"
});

//Connect to DB
pool.getConnection((err, Connection) => {
    if (err) throw err; //not connected
    console.log('connected as ID' + Connection.threadId)
});



app.use('/', routes)


app.listen(port,() => console.log(`Listening on port ${port}`));


