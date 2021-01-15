const express = require('express'),
bodyParser = require('body-parser'),
mysql = require('mysql'),
handlebars = require('express-handlebars'),
app = express();

// Template engine
app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Routes and templates
app.get("/:id?", function(req, res){
    /* res.send('Initial page');
    res.sendFile(__dirname+'/index.html'); */
    // console.log(req.params.id);
    res.render('index', {id:req.params.id});
});

//  Start Server
app.listen(3000, function(req, res){
    console.log('Server running');
});