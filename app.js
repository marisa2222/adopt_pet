const express = require("express");
const pets = require("./petList");

const app = express();

app.listen(8000, function () {
  console.log("Server is up and listens to 8000");
});

app.get("/", function (req, res) {
  let dogs = `<li><a href="/animals/dogs">Dogs</a></li> `;
  let cats = `<li><a href="/animals/cats">Cats</a></li> `;
  let rabbits = `<li><a href="/animals/rabbits">Rabbits</a></li> `;

  res.send(`<h1>Adopt a Pet!</h1>
   <p>Browse through the links below to find your new furry friend:</p> 
   <ul> 
   ${dogs}
   ${cats}
   ${rabbits}
   
   </ul>`);
});

app.get("/animals/:pet_type", function (req, res) {
  let dogs = "";
  let cats = "";
  let rabbits = "";

  let pet;
  pets.cats.forEach((element,index) => {
    cats += `<li>
    <a href="/animals/cats/${index}">${element.name}</a></li>`;
  });

  pets.dogs.forEach((element,index) => {
    dogs += `<li><a href="/animals/dogs/${index}">${element.name}</a></li>`;
  });

  pets.rabbits.forEach((element,index) => {
    rabbits += `<li><a href="/animals/rabbits/${index}">${element.name}</a></li>`;
  });

  if (req.params.pet_type === "dogs") {
    pet = dogs;
  } else if (req.params.pet_type === "cats") {
    pet = cats;
  } else {
    pet = rabbits;
  }
  res.send(`
  <h1>List of ${req.params.pet_type}</h1>
  
  <ul> 
  ${pet}
  
  
  </ul>`);
});

app.get("/animals/:pet_type/:pet_id", function (req, res) {
  const type = req.params.pet_type;
  const key = req.params.pet_id;
  let pet = [];

  if (type === "dogs") {
    pet = pets.dogs;
  } else if (type === "cats") {
    pet = pets.cats;
  } else {
    pet = pets.rabbits;
  }

  const findPet = pet[key];
  res.send(
    `
  <h1>${findPet.name}</h1>
  <img src=${findPet.url} alt="dog" width="300" height="400">
  <p>${findPet.description}</p>

  <ul> 
  <li>${findPet.breed}</li>
  <li>${findPet.age}</li>
  </ul>`
  );
});
