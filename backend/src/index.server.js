const express = require('express')
const app = express()
const env = require('dotenv')
// const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const pageRoutes = require('./routes/admin/page');

const initialRoute = require('./routes/admin/initialRoute');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const { default: mongoose } = require('mongoose');
const path = require('path')
const cors = require('cors')


env.config()
const port = process.env.PORT
// const port = 3000
// app.use(bodyParser.json({ limit: "30mb", extended: true }))
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))


// Mongodb connection
// mongodb+srv://ruhul:bj3fUNPIpzXYtUTk@cluster0.hcaap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.hcaap.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('Database connected')
//   client.close();
// });

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Database connected')
})

app.use(express.json())
app.use(cors())
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/public', express.static(path.join(__dirname, 'uploads/category')))
app.use('/public', express.static(path.join(__dirname, 'uploads/product')))

// All router here
// Admin Route
app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', pageRoutes)

//User route
app.use('/api', initialRoute)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})