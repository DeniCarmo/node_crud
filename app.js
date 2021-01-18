const express = require('express'),
bodyParser = require('body-parser'),
mysql = require('mysql'),
handlebars = require('express-handlebars'),
app = express(),
urlencondeParser = bodyParser.urlencoded({extended:false}),
sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306
});

// Call sql and passing witch database will be used
sql.query('use nodejs');

// Template engine
app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

/* This is the 'use' method, in this case the path
in the html must contain the path from the referenced file
ex: /css/style.css */
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));

// Routes and templates
app.get("/", function(req, res){
    /* res.send('Initial page');
    res.sendFile(__dirname+'/index.html'); */
    // console.log(req.params.id);
    res.render('index');
});

app.get('/insert', function(req, res){
    res.render('insert');
});

app.get('/select/:id?', function(req, res){
    if(!req.params.id){
        sql.query("SELECT * FROM user ORDER BY id ASC", function(err, results, fields){
            res.render('select',{data:results});
        });
    }else{
        sql.query("SELECT * FROM user WHERE id=? ORDER BY id ASC", [req.params.id],function(err, results, fields){
            res.render('select',{data:results});
        });
    }
});

app.get('/delete/:id', function(req, res){
    sql.query("DELETE FROM user WHERE id=?", [req.params.id]);
    res.render('delete');
});

app.get('/update/:id', function(req, res){
    sql.query("SELECT * FROM user WHERE id=?", [req.params.id], function(err, results, fields){
        res.render('update', {id:req.params.id, name:results[0].name, age:results[0].age});
    });
});

app.post('/controllerUpdate', urlencondeParser, function(req, res){
    sql.query("UPDATE user SET name=?, age=? WHERE id=?", [
        req.body.name,
        req.body.age,
        req.body.id
    ]);
    res.render('controllerUpdate');
});

app.post('/controllerForm', urlencondeParser, function(req, res){
    let id = req.body.id,
        name = req.body.name,
        age = req.body.age;
    sql.query("INSERT INTO user VALUES (?, ?, ?)", [
        id,
        name,
        age
    ]);
    res.render('controllerForm', {name:name});
});

/* This is the route method to call the static files folder
and in this case it's not necessary to use the full path,
it is only required to use the file name */
/* app.get('/script', function(req, res){
    res.sendFile(__dirname + '/js/script.js');
    console.log('Scripts loaded.');
}); */

//  Start Server
app.listen(3000, function(req, res){
    console.log('Server running');
});