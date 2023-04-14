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
    pets.cats.forEach((element) => {
      cats += `<li>${element.name}</li>`;
    });
  
    pets.dogs.forEach((element) => {
      dogs += `<li>${element.name}</li>`;
    });
  
    pets.rabbits.forEach((element) => {
      rabbits += `<li>${element.name}</li>`;
    });
  


  if (req.params.pet_type === "dogs") {
    pet=dogs;
  } else if (req.params.pet_type === "cats") {
    pet=cats;

  } else {pet=rabbits;

  }
  res.send(`
  <h1>List of ${req.params.pet_type}</h1>
  
  <ul> 
  ${pet}
  
  
  </ul>`
  );
});


app.get("/animals/:pet_type/:pet_id", function (req, res) {
});