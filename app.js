const express = require('express')
const dotenv = require('dotenv')

// Load the config file (where our global variables are present)
dotenv.config({ path: './config/config.env' })

// Initialize our app with express
const app = express()

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));