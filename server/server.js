const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const cookieparser = require("cookie-parser");
const session = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const cors = require("cors");
const {hashPassword} = require("mysql/lib/protocol/Auth");
const app = express();
const setRounds =10;
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(cookieparser());
app.use(bodyParser.json());



const db = mysql.createConnection({
    host:'mysql-1501fbdc-charansdb.a.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_wqJEv19TwrJJCpoRrZE',
    database: 'yumyacht',
    port:'20259'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log("Connected to database");
});
//session
app.use(
    session({
        key:'username',
        secret:'password',
        resave: false,
        saveUninitialized: false,
        cookie:{
            expire:60*10,
        }
    })
)

//register

app.post('/register',(req,res)=>{
    console.log(req.body);
    const name= req.body?.name;
    const email=req.body?.email;
    const role=req.body?.role;
    const password=req.body?.password;
    bcryptjs.hash(password,setRounds,(err,hash)=>{
        if(err){
            console.log(err)
        }

        db.query('INSERT INTO registertable(name, email, role, password) VALUES (?,?,?,?)',
            [name, email,role, hash],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log(result);
                    return res.status(200).json({ message: 'Registration Successful' });
                }
            }
        );
    })
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("We need token give it next time");
    } else {
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Failed to authenticate" });
            } else {
                req.mail = decoded.id;
                next();
            }
        });
    }
};

app.get('/isAuth',verifyJWT,(req,res)=>{
    res.send("Authenticeted Successfully");
})

app.post('/login', async (req, res) => {
    const email = req.body?.email;
    const password = req.body?.password;

    db.query(
        "SELECT * FROM registertable WHERE email=?",
        [email],
        (err, result) => {
            if (err) {
                console.log("Error:", err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (result.length > 0) {
                bcryptjs.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        const id  = result[0].id;
                        const token = jwt.sign({ id }, "secret", { expiresIn: 5 });
                        res.json({ auth: true, token: token, result: result[0], message: 'Login Successful' });
                    } else {
                        res.status(401).json({ message: 'Invalid Credentials' });
                    }
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        }
    );
});




app.get('/',(req,res)=>{
    //function to check if backend is running in browser
    res.json("Hii charan, backend is running");
})
app.listen(8080, () => {
    console.log("Listening in 8080");
});



