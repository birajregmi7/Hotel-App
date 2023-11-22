//session is 1 single interaction between client and server.
//stateful protocol is something which requires server to save the status and session information. eg=> ftp
//stateless protocol is something that does not require the server to retain the server information. eg=> http

//express session => stateless http's ko statefull banaune. session related information server site ma save garaune

const express = require('express')
const app = express();
const session = require('express-session')

const sessionOptions = {
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: true,
}
app.use(session(sessionOptions)) //yo middleware le session id create gardincha as a cookie

app.get('/test', (req, res) => {
    res.send('test successful')
});
app.get('/register', (req, res) => {
    let { name = 'someoneunknown' } = req.query;
    // console.log(req.session)->  cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
    req.session.name = name;
    res.redirect('/hello');
})
app.get('/hello', (req, res) => {
    res.send(`hello,${req.session.name}`)
})
app.get('/requestcount', (req, res) => {
    if (req.session.count) { //edi req.session.count exist garcha vane increment garaune gardain vane 1 dine
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`You sent the request ${req.session.count} times`)
})
app.listen(3000, () => {
    console.log('Server is running');
})