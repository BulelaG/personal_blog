const express = require('express');
const cors = require('cors');


// Needed fixes
// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

// const contactRouter = require(".routes/contactRouter");
require('dotenv').config()

const useRouter = require("./userRouter");
const postRouter = require("./postRouter");


const app = express();
app.set("port", process.env.PORT|| 5555);

app.use(express.json());
app.use(cors());


app.get("/",(req, res) => {
    const _rootUrl = req.get("host") + req.url;
    res.send({
        msg:"Welcome to the API .Check the routes object",
        routes: {
            contact: `${_rootUrl}contact`,

        },

    });

});

// app.use("/contact", contactRouter);
app.use("/users", useRouter);
app.use("/posts", postRouter);

app.listen(app.get("port"), () => {
console.log(`Listening for calls on port ${app.get("port")}`);
console.log("Press ctrl+C to exit server");
});


// -----------------------------
  // UPDATE USER WITH ID


// router.put('/:id',(req, res, next) =>{

//  const {name, email, contact, password, avatar, about} = req.body;

//  let sql = "UPDATE users-table SET";

 

//  if(name) sql += `user_name=${name}`;
//  if(email) sql += `user_email=${email}`;
//  if(contact) sql += `user_contact=${contact}`;
//  if(password) sql += `user_password=${password}`;
//  if(avatar) sql += `user_avatar=${avatar}`;
//  if(about) sql += `user_about=${about}`;






//  sql += `WHERE user_id=${req.params.user.id}`

//  con.query(sql, function(err, result) { 
//     if(err) throw err;
//     console.log("1 record inserted");
//     res.send(result)
// });

// });
