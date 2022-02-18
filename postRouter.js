const express = require('express');
const res = require('express');
const router = express.Router();
const mysql = require('mysql');
const authenticateToken = require('./auth');


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "8-2fermENt2020",
    database: "personal_blog"
});


// The Date Function

function getToday() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
  
    today = mm + "/" + dd + "/" + yyyy;
  
    return today;
  }




// post REGISTRATION
router.post('/', authenticateToken, (req, res, next) => {

const{title, body } = req.body;
const user = req.user;
if (!title || !body ) res.sendStatus(400);

res.send(user);

    var sql = `INSERT INTO posts (post_title, post_body ) VALUES ( '${title}', '${body}', '${getToday()}', '${req.user.user_id}')`;
    con.query(sql, function(err, result) {
        // if(err) throw err;
        console.log("1 record inserted");
        res.send({msg:"Post created successfully",
                  post_id:result.insertId
                });
    });
});




// GET ALL POSTS
router.get('/', authenticateToken, (req, res, next) => {

   
    var sql = `SELECT * FROM posts`;
    con.query(sql, function(err, result) { 
        if(err) throw err;
        console.log("1 record inserted");
        res.send(result)
    });
});



// Get one post


    router.get('/:id',(req, res, next) => {

        var sql = `SELECT * FROM posts WHERE posts_id=${req.params.id}`;
        con.query(sql, function(err, result) { 
            if(err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });

    });

    // UPDATE BLOG POSTS

router.put('/:id', (req, res, next)=>{

    const { title, body, date, author } = req.body;

  let sql = "UPDATE Posts SET"; 
  
  if(title) sql += `post_title = ${title}`;
  if(body) sql += `post_body = ${body}`;
  if(date) sql += `post_date = ${date}`;
  if(author) sql += `post_author = ${author}`;

  sql += `WHERE posts_id=${req.params.id}`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send(result)
  });

});


  

    // DELETE a posts
    router.get('/:id',(req, res, next) => {

        var sql = `DELETE * FROM posts WHERE posts_id=${req.params.id}`;
        con.query(sql, function(err, result) { 
            if(err) throw err;
            console.log("1 record inserted");
            res.send("Number of records deleted: "+result)
        });



    })



// // Sign in user
//     router.patch('/',(req, res, next) => {
// const {title, body} = req.body;
//         var sql = `SELECT * FROM posts WHERE user_title='${title}' AND post_body='${body}'`;
//         con.query(sql, function(err, result) { 
//             if(err) throw err;
//             console.log("1 record inserted");
//             res.send(result)
//         });



//     });



module.exports = router;

