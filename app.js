const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
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

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(methodOverride(function (req, res) {
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

// Run morgan in development mode to see request logs
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars helpers
const { formatDate, truncate, stripTags, editIcon } = require('./helpers/hbs')

// Setting the view engine with handlebars
app.engine('.hbs', exphbs.engine({ 
        helpers: {
            formatDate,
            truncate,
            stripTags,
            editIcon,
            json: function (context) {
                return JSON.stringify(context);
            }
        },
        defaultLayout: 'main', 
        extname: '.hbs' 
    })
)
 
app.set("view engine", "hbs");  
app.set("views", "./views");
app.set('view engine', '.hbs')

// Sessions
app.use(session({
    secret: 'some secret here',
    resave: false,              // means we don't want to save a session if nothing is modified
    saveUninitialized: false,   // means don't create a session until a something is stored 
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,})
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global variable
app.use(function (req, res, next) {    
    res.locals.user = req.user || null    
    next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));