require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { default: mongoose } = require('mongoose')
const AddRecipient = require('./routes/recipientadd')
const TransactionRouter = require('./routes/NewT')
const DataRouter = require('./routes/Transaction')


app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

//app.use('/', express.static(path.join(__dirname, 'public')))
//app.use('/', require('./routes/root'))

/*app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})*/

app.use(errorHandler)

//routes
app.use('/api',TransactionRouter)
app.use('/api',AddRecipient)
app.use('/api',DataRouter)










//db connection
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server listening to port', process.env.PORT)
    })
})
.catch((err) => {
    console.error('Error connecting to database:', err.message)
    process.exit(1)
})

