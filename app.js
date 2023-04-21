const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db');

// Load the config file (where our global variables are present)
dotenv.config({ path: './config/config.env' })

connectDB();

// Initialize our app with express
const app = express()

// Run morgan in development mode to see request logs
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Setting the view engine with handlebars
app.engine('.hbs', exphbs.engine(({ defaultLayout: 'main', extname: '.hbs' })))
app.set('view engine', '.hbs')

// Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));