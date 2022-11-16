const express = require("express");

const cors = require('cors');

let app = express(); 

var path = require("path");

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'Andyman72599',
      database : 'helpdesk'
    }
});

const port = 3001;

app.use(cors());

app.get('/view', (req, res) => {
    knex.select().from('viewTickets').then(result => {
        res.json({'data':result});
    });
});

app.listen(port, () => console.log('Server is running...'));