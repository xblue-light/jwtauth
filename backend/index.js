const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/user'); 

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
        .then(()  => {console.log('Database is connected')}, err => {console.log('CANNOT connect to the database'+ err)});

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/', function(req, res) {
    res.send(`Express server running on => http://localhost:${PORT}`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});