const logMealButton = document.getElementById("log-meal");

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
            protein: parseInt(row.cells[2].textContent)
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
