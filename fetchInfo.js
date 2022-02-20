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
      let newInput = document.createElement('input');
      let newLabel = document.createElement('label');

      newInput.className = "form-check-input me-1";
      newItem.className = "list-group-item"
      newInput.type = "checkbox";
      newLabel.textContent = selectedItem;

      if (selectedItem.length === 0) {
         alert("You must add a valid input");
      } else {
         newItem.appendChild(newInput);
         newItem.appendChild(newLabel)
         ingredientList.appendChild(newItem);
         foodSearchInput.value = "";
      }
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

   fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${parameters}&ranking=2&ignorePantry=true&number=12`, {
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
                  let tempRecipeDIV = `
                     <div class="col">
                     <div class="card2">
                     <img src="${data.image}" class="card-img-top" alt="...">
                     <div class="card-body">
                     <h5 class="card-title">${data.title}</h5>
                     <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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
console.log(addedIngredientsDIV)

