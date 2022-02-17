const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "8-2fermENt2020",
    database: "personal_blog"
})



// USER REGISTRATION
router.post('/',(req, res) => {

const{name, email, contact, password} = req.body;
if (!name || !email || !contact || !password)
res.status(400).send({msg:"Not all fields have been submitted"});

    var sql = `INSERT INTO users (user_name, user_email, user_contact, user_password ) VALUES ( '${name}', '${email}', '${contact}', '${password}');`
    con.query(sql, function(err, result) {
        if(err) throw err;
        console.log("1 record inserted");
    });
}); g




// GET ALL USERS
router.get('/',(req, res) => {

   
    var sql = `SELECT * FROM users`;
    con.query(sql, function(err, result) { 
        if(err) throw err;
        console.log("1 record inserted");
        res.send(result)
    });

    router.get('/:id',(req, res, next) => {

        var sql = `SELECT * FROM users WHERE user_id=${req.params.id}`;
        con.query(sql, function(err, result) { 
            if(err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });

    })

    })

    // DELETE A USERS
    router.get('/:id',(req, res, next) => {

        var sql = `DELETE * FROM users WHERE user_id=${req.params.id}`;
        con.query(sql, function(err, result) { 
            if(err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });



    })



// Sign in user
    router.patch('/',(req, res, next) => {
const {email, password} = req.body
        var sql = `SELECT * FROM users WHERE user_email='${email}' AND user_password='${password}'`;
        con.query(sql, function(err, result) { 
            if(err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });



    })


    


    
    

    




module.exports = router;


