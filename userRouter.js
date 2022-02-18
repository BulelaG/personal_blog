require("dotenv").config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "8-2fermENt2020",
    database: "personal_blog"
});



function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
  
    const token = authHeader && authHeader.split(" ")[1];
  
    if(!token) res.sendStatus(401)
    
    jwt.verify(token, process.env.MY_KEY, (err, user) => {
      if(err) res.sendStatus(403)
      req.user = user;
      next();
  
    });
  };



// USER REGISTRATION
router.post('/',async(req, res) => {

const{name, email, contact, password} = req.body;
if (!name || !email || !contact || !password)
res.status(400).send({msg:"Not all fields have been submitted"});
try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    var sql = `INSERT INTO users (user_name, user_email, user_contact, user_password ) VALUES ( '${name}', '${email}', '${contact}', '${hashedPassword}');`
    con.query(sql, function(err, result) {
        if(err) throw err;
        console.log("1 record inserted");
    });
} catch (error) {
    res.status(500).send()
  }
});




// GET ALL USERS
router.get('/',(req, res) => {

   
    var sql = `SELECT * FROM users`;
    con.query(sql, function(err, result) { 
        if(err) throw err;
        console.log("1 record inserted");
        res.send(result)
    });

// GET ONE USERS
    
    router.get('/:id',(req, res, next) => {

        var sql = `SELECT * FROM users WHERE user_id=${req.params.id}`;
        con.query(sql, function(err, result) { 
            if(err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });

    });

    })

    // DELETE A USER
    router.get('/:id',(req, res, next) => {

        var sql = `DELETE * FROM users WHERE user_id=${req.params.id}`;
        con.query(sql, function(err, result) { 
            if(err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });



    });

    // / UPDATE USERS

    router.put('/:id', (req, res, next)=>{
    
    const { name, email, contact, password, avatar, about } = req.body;
    
      let sql = "UPDATE users SET"; 
      
      if(name) sql += `user_name = ${name}`;
      if(email) sql += `user_email = ${email}`;
      if(contact) sql += `user_contact = ${contact}`;
      if(password) sql += `user_password = ${password}`;
      if(avatar) sql += `user_avatar = ${avatar}`;
      if(about) sql += `user_about = ${about}`;
      
    
      sql += `WHERE user_id=${req.params.id}`;
    
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.send(result)
      });
    });
      



// Sign/Log-in in user
    router.patch('/',(req, res, next) => {
        const {email, password} = req.body;

        var sql = `SELECT * FROM users WHERE user_email='${email}'`;
        con.query(sql, async function(err, result) { 
            if(err) throw err;
            console.log("1 record found");


            const user = result[0];

            console.log(user);

            const match = await bcrypt.compare(password, user.user_password);
            if(match) {

            const access_token = jwt.sign(user, process.env.SECRET_KEY);
            res.send({ jwt:access_token });
            req.user = user;
            }else {
            res.send()
            }

        });



    });




module.exports = router;


