let getFoodEl = document.getElementById("food-input");
let foodListEl = document.getElementById("display-food");
let exerciseEl = document.getElementById("exercises");
let bodyPartEl = document.getElementById("body-part-list");
let exerciseListEl = document.getElementById("exercise-list");
let exerciseTitleEl = document.getElementById("exercise-title");
let exerciseInstructionsEl = document.getElementById("exercise-instructions");
const muscleButtons = document.querySelectorAll(".muscle");
const deleteEl = document.getElementById("delete");

// Fetch request to pull data by chosen muscle group
function getExercise(bodyPart) {
  fetch(`https://work-out-api1.p.rapidapi.com/search?Muscles=${bodyPart}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "17ae5600c9msha4401cdad279f53p1ef66ejsnce440ee66ab6",
      "X-RapidAPI-Host": "work-out-api1.p.rapidapi.com",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      populateExercises(data);
    });
}

// Fetch request to pull data on typed-in food and amount
function getNutrition(food) {
  let enteredFood = food;
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

      // Log data for debugging
      console.log(`Food: ${enteredFood}`);
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

      // Create object to store nutrition data
      let food = {
        name: enteredFood, // previously data.ingredients[0].text
        calories: data.calories,
        fat: `${data.totalNutrients.FAT.quantity.toFixed(1)} ${
          data.totalNutrients.FAT.unit
        }`,
        carbs: `${data.totalNutrients.CHOCDF.quantity.toFixed(1)} ${
          data.totalNutrients.CHOCDF.unit
        }`,
        protein: `${data.totalNutrients.PROCNT.quantity.toFixed(1)} ${
          data.totalNutrients.PROCNT.unit
        }`,
      };

      // Log food object for debugging
      console.log(food);

      createFoodRow(food);
    });
}

// Create a row using nutrition data from food object
function createFoodRow(food) {
  let tr = document.createElement("tr");
  foodListEl.appendChild(tr);

  let th = document.createElement("th");
  let thCheckbox = document.createElement("input");
  thCheckbox.setAttribute("type", "checkbox");
  thCheckbox.setAttribute("class", "checkbox");
  tr.appendChild(th);
  th.appendChild(thCheckbox);

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

  let td3 = document.createElement("td");
  td3.textContent = food.protein;
  tr.appendChild(td3);
}

// Create 10 buttons to list workouts based on chosen muscle group
function populateExercises(data) {
  exerciseListEl.innerHTML = "";

  for (i = 0; i < 10; i++) {
    let exercise = data[i];
    console.log(exercise.WorkOut);

    let button = document.createElement("button");
    button.setAttribute(
      "class",
      "btn btn-primary text-base-content text-base m-5 text-xs"
    );
    button.textContent =
      exercise.WorkOut.charAt(0).toUpperCase() + exercise.WorkOut.slice(1);
    button.addEventListener("click", function () {
      renderInstructions(exercise);
    });
    exerciseListEl.appendChild(button);
  }
}

// Render the chosen exercise's name and instructions onto the page
function renderInstructions(exercise) {
  exerciseTitleEl.innerHTML = "";
  exerciseInstructionsEl.innerHTML = "";

  let instruct = exercise.Explaination;
  console.log(instruct);

  exerciseTitleEl.textContent =
    exercise.WorkOut.charAt(0).toUpperCase() + exercise.WorkOut.slice(1);

  let li = document.createElement("li");
  li.textContent = instruct;

  exerciseInstructionsEl.appendChild(li);
}

// Button to fetch nutrition info of typed-in food
getFoodEl.addEventListener("submit", function () {
  //   event.preventDefault();

  let food = document.getElementById("food").value;

  getNutrition(food);
});

// Button to fetch data for chosen muscle group
muscleButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    const muscleGroup = event.target.textContent;

    console.log(muscleGroup);

    getExercise(muscleGroup);

    console.log(`button clicked: ${event.target}`);
  });
});

// Delete button for checked items
deleteEl.addEventListener("click", function () {
  const checkboxes = document.querySelectorAll(".checkbox");

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      checkbox.closest("tr").remove();
    }
  });
});
