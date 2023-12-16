require("dotenv").config();
let mongoose = require("mongoose");

const mySecret = process.env["MONGO_URI"];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection error');
      });;

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: Number,
  favoriteFoods: [String],
}, {collection: "MyCollection"});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let janeFonda = new Person({
    name: "James Blake",
    age: 84,
    favoriteFoods: ["pizza", "soup", "ice cream"]
  });

  
  janeFonda.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

//createAndSavePerson()

var arrayOfPeople = [
  { name: "Jarod", age: 34, favoriteFoods: ["Thai Curry"] },
  { name: "Jan Doe", age: 57, favoriteFoods: ["Tikka masala"] },
  { name: "Jenson", age: 67, favoriteFoods: ["Chili con carne"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
      if(err) return console.log(err); 
      person.favoriteFoods.push(foodToAdd)
      person.save((err, updatedPerson) => {
          if(err) return console.log(err);
          done(null, updatedPerson)
      });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true},(err, data) => {
                          if (err) return console.error(err);
                          done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
         if (err) return console.error(err);
         done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
        .sort({name: 1})
        .limit(2)
        .select({age: 0})
        .exec((err, data) => {
          if (err) return console.error(err);
          done(null, data);
        
        });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
