

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

});
