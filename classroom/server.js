const express = require('express')
const app = express();
const user = require('./user')
const post = require('./post')
const cookieParser = require('cookie-parser')
//learning cookies
//cookies are the data that are stored 
app.use(cookieParser()); // yo euta middle ware jasle cookie to data lai read garna dincha without it we can't parse it yo chai euta npm package ho

app.get('/getcookies', (req, res) => {
    res.cookie('Biraj', 'Regmi');
    res.cookie('College', 'Lpu');
    res.cookie('name', 'Sujal')
    res.send('Cookies send')
});
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