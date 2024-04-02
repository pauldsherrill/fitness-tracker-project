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
});
