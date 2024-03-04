const express = require('express')
const app = express()
const cors = require('cors')
const Router = require('./routes/commonnroute')
const bodyparser = require('body-parser')
const registrationuser = require('./routes/userRoutes')
const companyregister = require('./routes/companyroutes')
const adminroute = require('./routes/AdminRoute')

require('./config/connection')(app)


app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(express.json())
app.use(cors())

app.use('/',Router);
app.use('/userRoute',registrationuser)
app.use('/companyroutes',companyregister)
app.use('/admin',adminroute)


