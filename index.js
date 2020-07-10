const mongoose = require('mongoose');
//Importing the campsite model as Campsite:
const Campsite = require('./models/campsite');

//URL of mongoDB server
const url = 'mongodb://localhost:27017/nucampsite';
//Connecting to that url:
//First argument is the url above
//Second argument is an object to set up options (setting these to deal with deprication warnings from the mongoDB node driver)
//Connect method returns a promise; so I chained a .then method to it
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {

    console.log('Connected correctly to server');

    //instantiate a new document
    const newCampsite = new Campsite({
        name: 'React Lake Campground',
        description: 'test'
    });

    newCampsite.save()
    .then(campsite => {
        console.log(campsite);
        return Campsite.find();
    })
    .then(campsites => {
        console.log(campsites);
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});