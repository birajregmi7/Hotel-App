//flash lai better tarika le use garna sakincha
//res.render bata hami templates render garcham ra tesko variables lai res.local ma save garaucham

const express = require('express')
const app = express();
const session = require('express-session')
const flash = require('connect-flash');
const path = require("path");

const sessionOptions = {
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: true,
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session(sessionOptions)) //yo middleware le session id create gardincha as a cookie
app.use(flash());//middleware 

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash('success')
    res.locals.errorMsg = req.flash('error')
    next();
})
app.get('/test', (req, res) => {
    res.send('test successful')
});
app.get('/register', (req, res) => {
    let { name = 'someoneunknown' } = req.query;
    // console.log(req.session)->  cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
    req.session.name = name;
    if(name==='someoneunknown'){
        req.flash('error','User is not registered')
    }else{
        req.flash("success", "user successfully registered")
    }
    res.redirect('/hello');
})
app.get('/hello', (req, res) => {
    res.render('page.ejs', { name: req.session.name});
})

app.listen(3000, () => {
    console.log('Server is running');
})