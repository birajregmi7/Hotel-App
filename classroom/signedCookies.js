const express = require('express')
const app = express();
const user = require('./user')
const post = require('./post')
const cookieParser = require('cookie-parser')
//learning cookies
//cookies are the data that are stored 
app.use(cookieParser("secretcode")); // yo euta middle ware jasle cookie to data lai read garna dincha without it we can't parse it yo chai euta npm package ho

app.get('/getsignedcookies', (req, res) => {
    res.cookie('made-in', 'Nepal', { signed: true });
    res.send('Signed Cookies sent')
});
app.get('/verify', (req, res) => {
    console.log(req.cookies);// khali 
    console.log(req.signedCookies); //edit hami signed cookies lai browser ko application bata edit garna try garcham vane tyo false vanera dekhaucha
})
app.get('/', (req, res) => {
    console.log(req.cookies)
    res.send('Hi i am root')
})
app.get('/greet', (req, res) => {
    let { name = 'Unknown?' } = req.cookies;
    res.send(`Hi ${name}`)
})
app.use('/user', user);
app.use('/post', post);

app.listen(3000, (req, res) => {
    console.log('Server is running')
})