
var mysql = require('mysql')
var express = require('express')
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "table"
})

app.set("view engine","ejs")

app.get('/',function(req, res) {
    res.render('index')
})

app.post('/',function(req, res) {
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password
    // console.log("heyy");

    var insert = "insert into result(name, email, password) values('"+name+"','"+email+"','"+password+"')";
    conn.query(insert,function(err, result) {
        if (err) throw err
        // console.log("asgd");
        res.send("data is inserted")
        // res.redirect("/")
    })
})

app.get('/delete/:id',function(req,res){
        var id = req.params.id
        var delet="delete from result where id="+id
        conn.query(delet,function(err,result){
        if(err) throw err     
           res.send("data is delete")
        })     
    })



app.get('/select',function(req, res) {
    var select = "select * from result"
    conn.query(select, function(err, result) {
        if (err) throw err
        // res.render("index",{result})
        res.send(result)
    })
})

app.get('/update/:id',function(req,res){
    res.render('update')
})

    app.post('/update/:id',function(req,res){
        var id = req.params.id
        var name = req.body.name
        var email = req.body.email
        var password = req.body.password

        var updt = "update result set name='"+name+"', email='"+email+"', password='"+password+"' where id = "+id;
        conn.query(updt,function(err, result) {
            if (err) throw err
            console.log("asgd");
            res.send("data is updated")
        
        })
    })

app.listen(5000);
