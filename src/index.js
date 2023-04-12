document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", handleSubmit);
  displayForm();
  fetchToys();
});
// global variables in one place
let addToy = false;
const API = "http://localhost:3000/toys";

const displayForm = () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
};
//psuedo code

//fetch andy's toys
const fetchToys = () => {
  fetch(API)
    .then((res) => res.json())
    .then((toys) => toys.forEach((toy) => renderToy(toy)));
};
const renderToy = (toy) => {
  //make a `<div class="card">
  let div = document.createElement("div");
  div.className = "card";
  // - `h2` tag with the toy's name
  let h2 = document.createElement("h2");
  h2.innerText = toy.name;
  // - `img` tag with the `src` of the toy's image attribute and the class name
  //   "toy-avatar"
  let image = document.createElement("img");
  image.className = "toy-avatar";
  image.src = toy.image;
  // - `p` tag with how many likes that toy has
  let p = document.createElement("p");
  p.innerText = `${toy.likes} Likes`;
  // - `button` tag with a class "like-btn" and an id attribute set to the toy's id
  //   number

  let likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.id = toy.id;
  likeButton.innerText = "Like <3";
  likeButton.addEventListener("click", patchLikes);

  // append all the card info into the div
  div.append(h2, image, p, likeButton);

  // add it to the toy collection div
  let toyDiv = document.querySelector("#toy-collection");

  toyDiv.appendChild(div);
};

//add a new toy(Post)
const handleSubmit = (event) => {
  event.preventDefault();

  // A `POST` request should be sent to `http://localhost:3000/toys` and the new toy added to Andy's Toy Collection.
  let toyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0,
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toyObj),
  };
  fetch(API, configObj)
    .then((res) => res.json())
    .then((toy) => renderToy(toy));
  event.target.reset();
};
const patchLikes = (event) => {
  let id = event.target.id;
  let updatedLikes =
    parseInt(event.target.previousElementSibling.innerText) + 1;
  let toyObj = {
    likes: updatedLikes,
  };
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body:JSON.stringify(toyObj)
  };
  fetch(API + `/${id} ` , configObj)
  .then(res => res.json())
  .then(toy =>{
    event.target.previousElementSibling.innerText = `${updatedLikes} Likes`
  })
};

// - If the post is successful, the toy should be added to the DOM without reloading the page}

// A `POST` request should be sent to `http://localhost:3000/toys` and the new
//   toy added to Andy's Toy Collection.
// - If the post is successful, the toy should be added to the DOM without
//   reloading the page

// increase toy likes (Patch)

// A `patch` request (i.e., `method: "PATCH"`) should be sent to the server at
//   `http://localhost:3000/toys/:id`, updating the number of likes that the
//   specific toy has
// - If the patch is successful, the toy's like count should be updated in the DOM
//   without reloading the page

// 1. capture that toy's id,
// 2. calculate the new number of likes,
// 3. submit the `patch` request, and
// 4. update the toy's card in the DOM based on the `Response` returned by the
//    fetch request.
