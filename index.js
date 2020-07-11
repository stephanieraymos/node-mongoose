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
  //The create method returns a promise that resolves to the new document
  Campsite.create({
    name: 'React Lake Campground',
    description: 'test' //If this description is deleted; it would return an error since we set up descriptions as 'required'
  });

  Campsite.create({
    name: 'Test Campground',
    description: 'test'
  })
    .then(campsite => {
      console.log(campsite);
      //Updating campsite document
      return Campsite.findByIdAndUpdate(campsite._id, {
        $set: { description: 'Updated Test Document'} //$set is the update operator
      }, {
        new: true //Causes method to return the updated document, otherwise the default will return the original 
      }); //Finds all documents that are based on the Campsite Model with a specified ID and updates the contents of the $set operators object. If successful: Returns all found docs in an array of objects
       //Adding a comment sub document to it
    })
    .then(campsite => {
      console.log(campsite) //Will see a console log of the original document, then a console log of the document with the updated description
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