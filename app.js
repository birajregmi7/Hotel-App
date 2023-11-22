const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate')
const ExpressError = require("./utils/ExpressError.js");
const MongoStore = require('connect-mongo')
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const listingRouter = require('./routes/listing.js')
const reviewRouter = require('./routes/review.js')
const userRouter = require('./routes/user.js')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/user.js')
require('dotenv').config();
const dbUrl = process.env.MONGODB_URI;


store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on('error', () => {
  console.log('ERROR in MONGO SESSION STORE', err)
})
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")))
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // user ka data session me store karna
passport.deserializeUser(User.deserializeUser()); // user ka data session se nikalna 

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user;
  next();
})

app.use('/listings', listingRouter)
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);



// edi user esto route ma jancha jo defined chain
app.all("*", (req, res, next) => {
  next(new ExpressError(404, 'Page not found'))
})
//error handeling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = 'Default Err' } = err;
  console.log(message)
  res.status(status).render("listings/error.ejs", { message });
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
