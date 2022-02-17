const express = require('express');
const router = express.Router();
const mysql = require('mysql');



const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "8-2fermENt2020",
    database: "personal_blog"
})



// post REGISTRATION
router.post('/',(req, res) => {

const{title, body, date, author} = req.body;
if (!title || !body  || !date || !author)
res.status(400).send({msg:"Not all fields have been submitted"});

    var sql = `INSERT INTO posts (post_title, post_body, post_date, post_author) VALUES ( '${title}', '${body}', '${date}', '${author}')`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        console.log("1 record inserted");
        res.send(result);
    });
});




// GET ALL POSTS
router.get('/',(req, res) => {

   
    var sql = `SELECT * FROM posts`;
    con.query(sql, function(err, result) { 
        if(err) throw err;
        console.log("1 record inserted");
        res.send(result)
    });

    router.get('/:id',(req, res, next) => {

        var sql = `SELECT * FROM posts WHERE posts_id=${req.params.id}`;
        con.query(sql, function(err, result) { 
            if(err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });

    })

    })

    // DELETE A USERS
    router.get('/:id',(req, res, next) => {

        var sql = `DELETE * FROM posts WHERE posts_id=${req.params.id}`;
        con.query(sql, function(err, result) { 
            if(err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });



    })



// Sign in user
    router.patch('/',(req, res, next) => {
const {title, body} = req.body;
        var sql = `SELECT * FROM posts WHERE user_title='${title}' AND post_body='${body}'`;
        con.query(sql, function(err, result) { 
            if(err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });



    })


    


    
    

    




module.exports = router;

