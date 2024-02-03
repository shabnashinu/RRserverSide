const express = require('express')
const app = express()
const cors = require('cors')
const Router = require('./routes/commonnroute')
const bodyparser = require('body-parser')

require('./utilities/connection')(app)

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/',Router)

