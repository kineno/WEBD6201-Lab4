import createError from 'http-errors'
import express, { NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './Routes/index'
import userRouter from './Routes/users'

const app = express()

// view engine
app.set('views', path.join(__dirname, 'Views'))
app.set('view engine', 'ejs')

// express settings
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'Client')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// express routes
app.use('/', indexRouter)
app.use('/users', userRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})

// Error handler
app.use((err: createError.HttpError, req: express.Request, res: express.Response, next: NextFunction) => {
    // set locals, only providing errors in dev env
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render error page
    res.status(err.status || 500)
    res.render('error')
})

export default app