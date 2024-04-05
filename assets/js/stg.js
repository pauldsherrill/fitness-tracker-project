const logMealButton = document.getElementById("log-meal");
const logExerciseButton = document.getElementById("log-exercise");


logMealButton.addEventListener("click", function () {

    const rows = document.querySelectorAll("#display-food tr");
    const meals = [];

    let totalCalories = 0;

    rows.forEach(row => {
        const meal = {
            food: row.cells[1].textContent,
            calories: parseInt(row.cells[2].textContent),
            carbs: parseInt(row.cells[3].textContent),
            fats: parseInt(row.cells[4].textContent),
            protein: parseInt(row.cells[5].textContent)
        };

        meals.push(meal);
        totalCalories += meal.calories;
    });

    localStorage.setItem('meals', JSON.stringify(meals));

    const mealsContainer = document.getElementById("meals-container"); //Update section
    mealsContainer.innerHTML = ""; 

    meals.forEach(meal => {
        const foodItem = document.createElement("div");
        foodItem.classList.add("flex", "flex-row");
        foodItem.innerHTML = `
            <div class="text-black mt-5 mr-2">${meal.food}</div>
            <div class="stat-desc mt-6">${meal.calories}cal</div>
        `;
        mealsContainer.appendChild(foodItem);
    });

    const totalCaloriesElement = document.getElementById("total-calories"); //Update calories in Summary
    totalCaloriesElement.textContent = totalCalories;

    alert("Meals logged correctly");

});

logExerciseButton.addEventListener("click", function() {

  const exContainer = document.getElementById("exercise-title");
  const noteContainer = document.getElementById("exercise-note");

  let title = exContainer.innerHTML;
  let note = noteContainer.value;

  console.log(title);
  console.log(note);

  let exerciseData = JSON.parse(localStorage.getItem("exercise")) || [];

  const exerciseObject = {
    exerciseTitle: title,
    exerciseNote: note
  };

  exerciseData.push(exerciseObject);

  localStorage.setItem("exercise", JSON.stringify(exerciseData));

  const exerciseContainer = document.getElementById("exercise-container");
  exerciseContainer.innerHTML = ""; 

  exerciseData.forEach(exerciseObject => {
    const exerciseItem = document.createElement("div");
    exerciseItem.classList.add("flex", "flex-row");
    exerciseItem.innerHTML = `
      <div class="text-black mt-5 mr-2"><strong>${exerciseObject.exerciseTitle}</strong></div> <!-- Corrección: Cambiado "title" a "exerciseTitle" -->
      <div class="stat-desc mt-6 text-black">${exerciseObject.exerciseNote}</div> <!-- Corrección: Cambiado "note" a "exerciseNote" -->
    `;
    exerciseContainer.appendChild(exerciseItem);
  });

  alert("Exercise logged correctly");

});

window.addEventListener('load', function() {

  const savedMeals = JSON.parse(localStorage.getItem('meals')) || [];
  const mealsContainer = document.getElementById('meals-container');
  let totalCalories = 0;

  savedMeals.forEach(meal => {
      const foodItem = document.createElement('div');
      foodItem.classList.add('flex', 'flex-row');
      foodItem.innerHTML = `
          <div class="text-black mt-5 mr-2">${meal.food}</div>
          <div class="stat-desc mt-6">${meal.calories}cal</div>
      `;
      mealsContainer.appendChild(foodItem);
      totalCalories += meal.calories;
  });

  const totalCaloriesElement = document.getElementById('total-calories');
  totalCaloriesElement.textContent = totalCalories;

  const savedExercises = JSON.parse(localStorage.getItem('exercise')) || [];
  const exerciseContainer = document.getElementById('exercise-container');

  savedExercises.forEach(exerciseObject => {
      const exerciseItem = document.createElement('div');
      exerciseItem.classList.add('flex', 'flex-row');
      exerciseItem.innerHTML = `
          <div class="text-black mt-5 mr-2"><strong>${exerciseObject.exerciseTitle}</strong></div>
          <div class="stat-desc mt-6 text-black">${exerciseObject.exerciseNote}</div>
      `;
      exerciseContainer.appendChild(exerciseItem);
  });
});
