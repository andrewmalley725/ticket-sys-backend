const express = require("express");

const cors = require('cors');

let app = express(); 

var path = require("path");

app.use(express.json());

app.use(express.urlencoded());

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '######',
      database : 'helpdesk'
    }
});

const port = 3001;

app.use(cors());

app.get('/view', (req, res) => {
    knex.select().from('viewTickets').where(knex.raw('status = "Incomplete"')).then(results => {
        res.json({'data':results});
    });
});

app.get('/closedtickets', (req,res) => {
    knex.select().from('completedTickets').then((results) => {
        res.json({'data': results});
    });
});

app.get('/employee', (req,res) => {
    let names = [];

    knex.select(knex.raw("empusername as name")).from('employee').then(results => {

        for (let i of results){
            names.push(i['name']);
        }
        res.json({'data':names});
    });
});

app.get('/customer',(req,res) => {
    let names = [];

    knex.select('username').from('user').then(results => {
        for (let i of results){
            names.push(i['username']);
        }
        res.json({'data':names});
    });
});

app.post('/addemp', (req,res) => {
    knex('employee').insert({
        empusername: req.body.userName,
        empfname: req.body.first,
        emplname: req.body.last
    }).then(() => console.log('employee added'));
});

app.post('/completed', (req,res) => {
    id = req.body.id;
    emp = req.body.emp;

    knex('ticket').where('ticketid',id).update({
        ticketid: id,
        empid: knex.select('empid').from('employee').where('empusername', emp)
    }).then(() => console.log('Record changed'));
});

app.post('/addcust', (req,res) => {
    knex('user').insert({
        username: req.body.userName,
        userfname: req.body.first,
        userlname: req.body.last
    }).then(() => console.log('Customer added'));
});

app.post('/addticket', (req,res) => {
    knex('ticket').insert({
        userid: knex.select('userid').from('user').where('username', req.body.user),
        description: req.body.msg
    }).then(() => console.log('Ticket added'));
});

app.listen(port, () => console.log('Server is running...'));