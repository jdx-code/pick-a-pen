# pick-a-pen

Web application for writters to showcase their literary works. The project is being build using NodeJS, Express, Mongo DB.

### Dependencies

> **express** - web framework
> **mongoose** - library for NodeJS and MongoDB 
> **connect-mongo** - allows to store sessions in database
> **express-session** - for sessions and cookies
> **express-handlebars** - template engine
> **dotenv** - for our config
> **method-override** - allows us to make PUT and DELETE requests from our templates coz by default we can only send GET and POST requests from templates
> **moment** - formatting dates
> **morgan** - logging records
> **passport** - authentication
> **passport-google-oauth20** - since we're using google for login

### Dev dependencies

> **nodemon** - continuously watch our server so that we don't have to restart every time we make any changes
> **cross-env** - inside the scripts of package.json, we will use a global variable which will represent any environment be it Windows/Mac/Linux etc..