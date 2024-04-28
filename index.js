const express= require('express')
const {router: urlRoute}= require('./routes/url')
const {router:staticRoute} = require('./routes/staticRoutes')
const {router:userRoute} = require('./routes/user')
const {restrictToLoginUsersOnly, checkAuth} = require('./middlewares/auth')

const cookieParser = require('cookie-parser')

const {connectToMongoDB} = require('./connect')

const path = require('path')

const app= express()

connectToMongoDB('mongodb://localhost:27017/URL-Shortner-Database')
.then( console.log('Connection to Database Successful'))

app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use(cookieParser())

app.set('view engine', 'ejs');

app.set('views', path.resolve('./views'))

app.use('/url', restrictToLoginUsersOnly,urlRoute);

app.use('/',checkAuth, staticRoute)

app.use('/user',userRoute)

const Port= 3000

app.listen(Port, ()=> console.log(`App Listening on Port ${Port}`));