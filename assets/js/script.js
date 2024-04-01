let getFoodEl = document.getElementById("food-input");
let foodListEl = document.getElementById("display-food");
let exerciseEl = document.getElementById("exercises");
let bodyPartEl = document.getElementById("body-part-list");
let exerciseListEl = document.getElementById("exercise-list");
let exerciseTitleEl = document.getElementById("exercise-title");
let exerciseInstructionsEl = document.getElementById("exercise-instructions");

let foodNumber = 0;

function getExercise(bodyPart) {
  fetch(
    `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=10`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8f9fccef91msh7afbf4517485a88p1ef2d0jsn27c16dc7f653",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      populateExercises(data);
    });
}

function listBodyParts() {
  fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPartList`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8f9fccef91msh7afbf4517485a88p1ef2d0jsn27c16dc7f653",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      renderBodyPartList(data);
    });
}

function getNutrition(food) {
  fetch(
    `https://api.edamam.com/api/nutrition-data?app_id=5a6e7bf2&app_key=52684844a0926b1e1b43dd3c939b92ad&nutrition-type=cooking&ingr=${food}`,
    {
      method: "GET",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      console.log(`Food: ${data.ingredients[0].text}`);
      console.log(`Calories: ${data.calories}`);
      console.log(
        `Fat: ${data.totalNutrients.FAT.quantity.toFixed(1)} ${
          data.totalNutrients.FAT.unit
        }`
      );
      console.log(
        `Carbohydrates: ${data.totalNutrients.CHOCDF.quantity.toFixed(1)} ${
          data.totalNutrients.CHOCDF.unit
        }`
      );

      let food = {
        name: data.ingredients[0].text,
        calories: data.calories,
        fat: `${data.totalNutrients.FAT.quantity.toFixed(1)} ${
          data.totalNutrients.FAT.unit
        }`,
        carbs: `${data.totalNutrients.CHOCDF.quantity.toFixed(1)} ${
          data.totalNutrients.CHOCDF.unit
        }`,
      };

      console.log(food);

      createFoodRow(food);
    });
}

function createFoodRow(food) {
  let tr = document.createElement("tr");
  foodListEl.appendChild(tr);

  let th = document.createElement("th");
  th.textContent = foodNumber + 1;
  tr.appendChild(th);
  foodNumber++;

  let td0 = document.createElement("td");
  td0.textContent = food.name;
  tr.appendChild(td0);

  let td = document.createElement("td");
  td.textContent = food.calories;
  tr.appendChild(td);

  let td1 = document.createElement("td");
  td1.textContent = food.carbs;
  tr.appendChild(td1);

  let td2 = document.createElement("td");
  td2.textContent = food.fat;
  tr.appendChild(td2);
}

function renderBodyPartList(data) {
  for (i = 0; i < 10; i++) {
    let bodyPart = data[i];

    let button = document.createElement("button");
    button.setAttribute(
      "class",
      "btn btn-accent text-base-content text-2xl m-2"
    );
    button.textContent = data[i].charAt(0).toUpperCase() + data[i].slice(1);

    button.addEventListener("click", function () {
      getExercise(bodyPart);
    });

    bodyPartEl.appendChild(button);
  }
}

function populateExercises(data) {
  exerciseListEl.innerHTML = "";

  for (i = 0; i < data.length; i++) {
    let exercise = data[i];

    let button = document.createElement("button");
    button.setAttribute(
      "class",
      "btn btn-primary text-base-content text-2xl m-2 btn-lg"
    );
    button.textContent =
      exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1);
    button.addEventListener("click", function () {
      renderInstructions(exercise);
    });
    exerciseListEl.appendChild(button);
  }
}

function renderInstructions(exercise) {
  exerciseTitleEl.innerHTML = "";
  exerciseInstructionsEl.innerHTML = "";

  let instruct = exercise.instructions;
  console.log(instruct);

  exerciseTitleEl.textContent = exercise.name;

  for (i = 0; i < instruct.length; i++) {
    let li = document.createElement("li");
    li.textContent = instruct[i];

    exerciseInstructionsEl.appendChild(li);
  }
}

listBodyParts();

getFoodEl.addEventListener("submit", function () {
  //   event.preventDefault();

  let food = document.getElementById("food").value;

  getNutrition(food);
});
