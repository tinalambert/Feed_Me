import { dataArray } from "./top-1k-ingredients.js";
import { fetchJoke } from "./fetchJoke.js";

// import { fetchRecipeID } from "./fetchRecipeID.js";
// console.log(fetchRecipeID)
// // fetchJoke()
// fetchRecipeID()

const rootDIV = document.getElementById("root")
const generateBtn = document.getElementById("generate-btn")
const foodSearchDIV = document.getElementById("foodSearch");
console.log(foodSearchDIV)
const foodList = document.getElementById("foodlistOptions");
console.log(foodList)
let addedIngredientsDIV = document.getElementById("addedIngredients");
console.log("This is the", addedIngredientsDIV);
// set parameters for fetch API
const foodSearchInput = document.getElementById("foodDataList");
console.log(foodSearchInput)
let ingredientList = document.getElementById("ingredientList");
console.log(ingredientList)

// Capture ingredients from top-1k-ingredients.js file
dataArray.forEach(ingredient => {
   //console.log(ingredient.description)
   let searchItem = `<option value="${ingredient}">`;
   foodList.innerHTML += searchItem
});

let recipeDIV = document.createElement("div");
recipeDIV.className = "row row-cols-1 row-cols-md-4 g-8";

foodSearchDIV.addEventListener("click", (e) => {
   if (e.target.tagName == "BUTTON") {
      console.log("button was clicked")
      // Should add newItem to ingredientList with the correct CSS presentation
      let selectedItem = foodSearchInput.value; // value of the searched ingredient
      // console.log(selectedItem)
      let newItem = document.createElement('li');
      let newInput = document.createElement('input');
      let newLabel = document.createElement('label');

      newInput.className = "form-check-input me-1";
      newItem.className = "list-group-item"
      newInput.type = "checkbox";
      newLabel.textContent = selectedItem;

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";

      if (selectedItem.length === 0) {
         alert("You must add a valid input");
      } else {
         newItem.appendChild(newInput);
         newItem.appendChild(newLabel)
         // newItem.appendChild(deleteButton);
         ingredientList.appendChild(newItem);
         foodSearchInput.value = "";
      }
   }
});

generateBtn.addEventListener("click", (e) => {

   // Creates Parameters from the list of added ingredients to pass into API

   // Add conditional check to clear the current set of results and populate new ones

   let items = ingredientList.getElementsByTagName("li");
   console.log("These are the items", items)
   let items2 = [];

   for (let i = 0; i < items.length; i++) {
      let parameter = items[i].innerText
      items2.push(parameter)
      // console.log("These are the parameters", items2);
   }
   let parameters = items2.join("%2C");
   // console.log(parameters)

   fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${parameters}&ranking=2&ignorePantry=true&number=12`, {
      "method": "GET",
      "headers": {
         "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
         "x-rapidapi-key": "379fb0a048mshc2b84dfb3126e66p19db79jsnb00c0294a230"
      }
   })
      .then(response => {
         console.log(response);
         return response.json()
      })
      .then(data => {
         console.log(data)
         for (const recipe of data) {
            // console.log(recipe.title)
            let tempRecipeDIV = `
            <div class="col">
            <div class="card2">
            <img src="${recipe.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${recipe.title}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
         </div>
      </div>
  `
         
            recipeDIV.innerHTML += tempRecipeDIV
         }
      })
      .catch(err => {
         console.error(err);
      });
   fetchJoke()
});
rootDIV.appendChild(recipeDIV)
console.log(addedIngredientsDIV)

