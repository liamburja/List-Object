//Install Express
const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');

//Install Access Directoy Static
const path = require('path');

//Install Morgan
app.use(morgan('tiny'));

//Install Cors
app.use(cors());

//Install JSON y Urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Use route App
app.use("/ascensor", require("./routes/ascensor.js"))


//Install Mongoose and connect to BBDD
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/'

const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};

mongoose.connect(uri, options).then(
  () => {
    console.log('Connect to BBDD');
  },

  err => {
    console.log(err);
  }
)


app.use('/api', require('./routes/ascensor'));
app.use('/api', require('./routes/user'));
app.use('/api/login', require('./routes/login'));

//Install Middleware for Vue.js router
const history = require("connect-history-api-fallback");
app.use(history())
app.use(express.static(path.join(__dirname, "public")));

//CONNECT PORT
app.set('puerto', process.env.PORT || 3000);

app.listen(app.get('puerto'), function () {
  console.log('Puerto:' + app.get('puerto'));
})

