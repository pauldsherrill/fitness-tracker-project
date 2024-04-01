let getFoodEl = document.getElementById("food-input");
let foodListEl = document.getElementById("display-food");
let exerciseEl = document.getElementById("exercises");

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

      createExerciseList(data);
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
  th.textContent = 1;
  tr.appendChild(th);

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

function createExerciseList(data) {
  for (i = 0; i < 10; i++) {
    div = document.createElement("div");
    h1 = document.createElement("h1");
    p = document.createElement("p");
    p1 = document.createElement("p");

    h1.textContent = data[i].bodyPart;
    p.textContent = data[i].equipment;
    p1.textContent = `Instructions: ${data[i].instructions}`;

    div.appendChild(h1);
    div.appendChild(p);
    div.appendChild(p1);

    exerciseEl.appendChild(div);
  }
}

getFoodEl.addEventListener("submit", function (event) {
  //   event.preventDefault();

  let food = document.getElementById("food").value;

  getNutrition(food);
});
