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

    //Instantiating a new document:
    //Campsite is the model we are instantiating
    const newCampsite = new Campsite({
        name: 'React Lake Campground',
        description: 'test'
    });

    const testCampsite = new Campsite({
      name: 'Test Campground',
      description: 'test'
  });

    //Using the save method on the new document (a mongoose method that will save the document to the database)
    //Returns a promise that will tell us whether the save operation failed or succeeded
    newCampsite.save()
    .then(campsite => {
        console.log(campsite);
        return Campsite.find(); //Finds all documents that are based on the Campsite Model. If successful: Returns all found docs in an array of objects
    })
    testCampsite.save()
    .then(campsite => {
        console.log(campsite);
        return Campsite.find(); //Finds all documents that are based on the Campsite Model. If successful: Returns all found docs in an array of objects
    })
    .then(campsites => {
        console.log(campsites); //Logging array of objects to the console
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => { //Catch any errors and console log the error messages
        console.log(err);
        mongoose.connection.close();
    });
});