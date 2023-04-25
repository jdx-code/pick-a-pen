const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db');

// Load the config file (where our global variables are present)
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB();

// Initialize our app with express
const app = express()

// Run morgan in development mode to see request logs
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Setting the view engine with handlebars
app.engine('.hbs', exphbs.engine(({ defaultLayout: 'mainLayout', extname: '.hbs' })))
app.set('view engine', '.hbs')

// Sessions
app.use(session({
    secret: 'some secret here',
    resave: false,              // means we don't want to save a session if nothing is modified
    saveUninitialized: false,   // means don't create a session until a something is stored 
    // store: MongoStore.create({ 
    //     mongoUrl: process.env.MONGO_URI,
    //     mongooseConnection: mongoose.connection 
    // })
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,})
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));