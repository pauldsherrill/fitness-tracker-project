<<<<<<< HEAD
const mealInput = document.querySelector("#meal");
const exerciseInput = document.querySelector("#exercise");

// renderLastRegistered();

AddMealButton.addEventListener("click", function (event) {
  event.preventDefault();

  const meal = mealInput.value;

  if (meal === "") {
    displayMessage("error", "meal cannot be blank");
  } else {
    displayMessage("success", "Registered successfully");

    localStorage.setItem("exercise", email);

    renderLastRegistered();
  }
});

AddExerciseButton.addEventListener("click", function (event) {
  event.preventDefault();

  const exercise = exerciseInput.value;

  if (exercise === "") {
    displayMessage("error", "exercise cannot be blank");
  } else {
    displayMessage("success", "Registered successfully");

    localStorage.setItem("exercise", email);

    renderLastRegistered();
  }
=======


const logMealButton = document.getElementById("log-meal");

logMealButton.addEventListener("click", function () {

  const rows = document.querySelectorAll("#display-food tr");
  const meals = [];

  rows.forEach(row => {
    const meal = {
      food: row.cells[1].textContent,
      calories: row.cells[2].textContent,
      carbs: row.cells[3].textContent,
      fats: row.cells[4].textContent
    };

    meals.push(meal);
  });

  localStorage.setItem('meals', JSON.stringify(meals));

  alert("Meals logged correctly");

>>>>>>> 15dc3440b357b562cdd1d02b48b33b18f3bdcde7
});
