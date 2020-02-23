// console.log("Logging from the dogs-frontend/index.js");

document.addEventListener("DOMContentLoaded", () => {
  addSomeListeners();
});

function addSomeListeners() {
  document.getElementById("filter").addEventListener("click", e => filterFx(e));
}

function getRadioValue() {
  const result = document.getElementsByName("order");
  for (let i = 0; i < result.length; i++) {
    if (result[i].checked) {
      return result[i].value;
    }
  }
  return "";
}

function filterFx(e) {
  e.preventDefault();
  const searchValue = document.querySelector("input", "name").value;
  const sortValue = getRadioValue();
  fetch(
    `http://localhost:3000/dog_search/?query=${searchValue}&sort_field=${sortValue}`
  )
    .then(res => res.json())
    .then(res => displayDogs(res))
    .catch(err => console.log(err));
}

function displayDogs(dogs) {
  document.getElementById("dogs-list").innerHTML = "";
  dogs.forEach(dog => appendOneDog(dog));
}

function appendOneDog(dog) {
  const dogList = document.getElementById("dogs-list");

  const h3Name = document.createElement("h3");
  h3Name.innerText = dog.name;

  const dogDiv = document.createElement("div");
  dogDiv.setAttribute("class", "info");

  const dogLi = document.createElement("li");

  const breedDiv = document.createElement("div");
  breedDiv.setAttribute("class", "breed");
  breedDiv.innerText = `Breed: ${dog.breed}`;

  const breedLabel = document.createElement("label");
  breedLabel.setAttribute("for", "breed");

  const tweetDiv = document.createElement("div");
  tweetDiv.setAttribute("class", "phrase");
  tweetDiv.innerText = `Tweet: ${dog.phrase}`;

  const tweetLabel = document.createElement("label");
  tweetLabel.setAttribute("for", "phrase");

  const sizeDiv = document.createElement("div");
  sizeDiv.setAttribute("class", "size");
  sizeDiv.innerText = `Size: ${dog.size}`;

  const sizeLabel = document.createElement("label");
  sizeLabel.setAttribute("for", "size");

  breedDiv.appendChild(breedLabel);
  tweetDiv.appendChild(tweetLabel);
  sizeDiv.appendChild(sizeLabel);

  dogDiv.appendChild(breedDiv);
  dogDiv.appendChild(tweetDiv);
  dogDiv.appendChild(sizeDiv);

  dogLi.appendChild(h3Name);
  dogLi.appendChild(dogDiv);

  dogList.appendChild(dogLi);
}
