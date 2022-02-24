import { dataArray } from "./top-1k-ingredients.js";
import { fetchJoke } from "./fetchJoke.js";

const rootDIV = document.getElementById("root")
const generateBtn = document.getElementById("generate-btn")
const foodSearchDIV = document.getElementById("foodSearch");
const foodList = document.getElementById("foodlistOptions");
let addedIngredientsDIV = document.getElementById("addedIngredients");
// set parameters for fetch API
const foodSearchInput = document.getElementById("foodDataList");
let ingredientList = document.getElementById("ingredientList");
let recipeDIV = document.createElement("div");
let countClick = 0;
recipeDIV.className = "row row-cols-1 row-cols-md-4 g-8";
// Capture ingredients from top-1k-ingredients.js file
dataArray.forEach(ingredient => {
   let searchItem = `<option value="${ingredient}">`;
   foodList.innerHTML += searchItem
});

// ADD SEARCH INPUTS TO "MY LIST"

foodSearchDIV.addEventListener("click", (e) => {
   if (e.target.tagName == "BUTTON") {
      let selectedItem = foodSearchInput.value;
      let newItem = document.createElement('li');
      let newLabel = document.createElement('label');
      let deleteButton = document.createElement('button');
      deleteButton.id ="deleteButton"
      deleteButton.className = "btn btn-light"
      deleteButton.innerHTML = `<i class="bi bi-trash3-fill"></i>`
      document.body.append(deleteButton)

      newItem.className = "list-unstyled text-center text-capitalize"
      // deleteButton.textContent = "x"
      newLabel.textContent = selectedItem;

      if (selectedItem.length === 0) {
         alert("You must add a valid input");
      } else {
         newItem.appendChild(newLabel);
         newItem.appendChild(deleteButton);
         ingredientList.appendChild(newItem);
         foodSearchInput.value = "";
      }
   }
});
// REMOVES INGREDIENT FROM LIST
ingredientList.addEventListener("click", (e) => {
   if (e.target.className == "bi bi-trash3-fill") {
      console.log("I am clicked")
      e.target.parentNode.parentNode.remove();
   }
});
// RESETS THE PAGE TO CLEAR OLD ITEMS
foodSearchDIV.addEventListener("click", function () {
   if (countClick >= 1) {
      location.reload();
   }
});
// COUNTS CLICKS
generateBtn.addEventListener("click", function () {
   countClick += 1;
   console.log(countClick);
});
generateBtn.addEventListener("click", (e) => {

   let finalIDArray = []
   let items = ingredientList.getElementsByTagName("li");
   let items2 = [];

   for (let i = 0; i < items.length; i++) {
      let parameter = items[i].innerText
      items2.push(parameter)
   }
   let parameters = items2.join("%2C");

   fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${parameters}&ranking=2&ignorePantry=true&number=20`, {
      "method": "GET",
      "headers": {
         "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
         "x-rapidapi-key": "379fb0a048mshc2b84dfb3126e66p19db79jsnb00c0294a230"
         }
      })
      .then(response => {
         return response.json()
      })
      .then(data => {
         for (let recipeID of data) {
            finalIDArray.push(recipeID.id)
         }
         return data
      })
      .then(data => {
         finalIDArray.forEach(id => {
            fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
               "method": "GET",
               "headers": {
                  "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                  "x-rapidapi-key": "379fb0a048mshc2b84dfb3126e66p19db79jsnb00c0294a230"
                  }
               })
               .then(response => {
                  return response.json()
               })
               .then(data => {
                  console.log(data)
                  let tempRecipeDIV = `
                     <div class="col-6 g-2 recipe-card">
                     <div class="card text-center h-100">
                     <img src="${data.image}" class="card-img-top" alt="...">
                     <div class="card-body">
                     <h5 class="card-title">${data.title}</h5>
                     <p class="text-truncate" style="max-height: 50px">${data.summary}</p>
                     <a href="${data.sourceUrl}" id="getRecipe" class="btn btn-secondary">Get the recipe!</a>
                     </div>
                     </div>
                     </div>
                     `;
                  recipeDIV.innerHTML += tempRecipeDIV;
               })
         })
      })
   fetchJoke()
});
rootDIV.appendChild(recipeDIV)
console.log(recipeDIV)

