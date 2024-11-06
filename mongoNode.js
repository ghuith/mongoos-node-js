// Import des dépendances nécessaires
const mongoose = require('mongoose');
require('dotenv').config();

// Connexion à MongoDB
mongoose.connect(
    "mongodb+srv://ghaith:<db_password>@cluster0.jim9d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    (err,done)=>{

        if (err){console.log(err)};
        {

            if (done){

                console.log ("base de donnes connect avec succes !");
            }
        }
    }
)

// Définition du schéma Person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

// Création du modèle Person
const Person = mongoose.model('Person', personSchema);

// Création et sauvegarde d'une personne
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["pizza", "pasta"]
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Création de plusieurs personnes
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

// Recherche de toutes les personnes avec un nom spécifique
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

// Recherche d'une personne par nourriture favorite
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

// Recherche d'une personne par ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

// Mise à jour d'une personne - Find, Edit, Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    
    person.favoriteFoods.push(foodToAdd);
    person.markModified('favoriteFoods');
    
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

// Mise à jour d'une personne avec findOneAndUpdate
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.error(err);
      done(null, updatedDoc);
    }
  );
};

// Suppression d'une personne par ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.error(err);
    done(null, removedDoc);
  });
};

// Suppression de plusieurs documents
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.error(err);
    done(null, response);
  });
};

// Recherche chainée
const queryChain = (done) => {
  Person.find({ favoriteFoods: "burrito" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
};
