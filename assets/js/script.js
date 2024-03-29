// let food = document.getElementById("food-input"); //text box for food input
// let foodOutput = document.getElementById("food-output"); //div for listing food info

// Body parts:
// 0:"back"
// 1:"cardio"
// 2:"chest"
// 3:"lower arms"
// 4:"lower legs"
// 5:"neck"
// 6:"shoulders"
// 7:"upper arms"
// 8:"upper legs"
// 9:"waist"

function getExercise() {
  fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10", {
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
    });
}
