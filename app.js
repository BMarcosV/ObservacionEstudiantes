import express from 'express'
import SesionRouter from './src/routes/SesionRouter.js'
import BuscarAlumnoRouter from './src/routes/BuscarAlumnoRouter.js'
import handlebars from 'express-handlebars'
import __dirname from './src/utils.js'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import initializePassport from './src/config/passport.js'
const app = express()
app.use(cookieParser())
app.use(session({
    /*store:MongoStore.create({
        client:mongoose.connection.getClient(),
        ttl:3600
    }),*/
    secret:'123xxx',
    resave:true,
    saveUninitialized:false
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(`${__dirname}/public`))
app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')


app.use('/alumno', BuscarAlumnoRouter)
app.use('/',SesionRouter)

app.listen(8085,() => {console.log(`Listen on port 8085`)})