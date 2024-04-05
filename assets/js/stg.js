const logMealButton = document.getElementById("log-meal");
const logExerciseButton = document.getElementById("log-exercise");

logMealButton.addEventListener("click", function () {

    const rows = document.querySelectorAll("#display-food tr"); // Get data from the table shown in nutrition
    const meals = [];

    let totalCalories = 0; // Sum total calories of meals

    // For each row in the table, create a meal with its properties
    rows.forEach(row => {
        const meal = {
            food: row.cells[1].textContent,
            calories: parseInt(row.cells[2].textContent),
            carbs: parseInt(row.cells[3].textContent),
            fats: parseInt(row.cells[4].textContent),
            protein: parseInt(row.cells[5].textContent)
        };

        meals.push(meal); // add each meal data into meals array
        totalCalories += meal.calories; // Sum calories of each meal
    });

    // Save meals array in local storage
    localStorage.setItem('meals', JSON.stringify(meals));

    // Update of meals container in Today's status
    const mealsContainer = document.getElementById("meals-container"); //Update section

    // Show meals logged in Local Stg by iterating
    meals.forEach(meal => {
        const foodItem = document.createElement("div");
        foodItem.classList.add("flex", "flex-row");
        foodItem.innerHTML = `
            <div class="text-black mt-5 mr-2">${meal.food}</div>
            <div class="stat-desc mt-6">${meal.calories}cal</div>
        `;
        mealsContainer.appendChild(foodItem);
    });

    // Update total calories in Today's Status section
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

  // If local stg has data, bring it
  let exerciseData = JSON.parse(localStorage.getItem("exercise")) || [];

  const exerciseObject = {
    exerciseTitle: title,
    exerciseNote: note
  };

  exerciseData.push(exerciseObject);

  // Save new exercise logged in local storage
  localStorage.setItem("exercise", JSON.stringify(exerciseData));

  // Update exercise container
  const exerciseContainer = document.getElementById("exercise-container");

  // Show logged exercises by iterate
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

  // Keep data after refresh information
window.addEventListener('load', function() {

  const savedMeals = JSON.parse(localStorage.getItem('meals')) || [];
  const mealsContainer = document.getElementById('meals-container');
  let totalCalories = 0;

  // Show meals information that is saved in local stg
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

  // Update calories in Today's Status Section
  const totalCaloriesElement = document.getElementById('total-calories');
  totalCaloriesElement.textContent = totalCalories;

  // If there is data, bring exercise information 
  const savedExercises = JSON.parse(localStorage.getItem('exercise')) || [];
  const exerciseContainer = document.getElementById('exercise-container');

  // Show logged exercise from local storage *title and note*
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
