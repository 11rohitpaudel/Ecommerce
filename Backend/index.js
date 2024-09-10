const express = require('express');

require("dotenv").config();

const db = require("./Connection/connection")

const app = express();
const morgan = require("morgan")
const cors = require('cors')
const port = process.env.PORT;
const bodyParser = require('body-parser');

const UserRoute = require("./Route/userRoute");
const CategoryRoute = require('./Route/categoryRoute');
const productRoute = require('./Route/productRoute');
const OrderRoute = require('./Route/orderRoute');

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', UserRoute);

app.use('/api', CategoryRoute);
app.use('/api', productRoute);
app.use('/api', OrderRoute);

app.use("/public/uploads", express.static(__dirname + '/public/uploads'))
app.get('/', (req, res) => {
    res.send("This is an ecommerce server")
})

app.listen(port, () => {
    console.log(`server get started at ${port}`)
})