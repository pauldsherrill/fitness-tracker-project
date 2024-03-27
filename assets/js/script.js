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
