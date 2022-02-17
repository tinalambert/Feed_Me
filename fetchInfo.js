import {dataArray} from "./top-1k-ingredients.js";
import { fetchJoke } from "./fetchJoke.js";
//fetchJoke();

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
recipeDIV.className = "container";
   
foodSearchDIV.addEventListener("click", (e) => {
   if (e.target.tagName == "BUTTON") {
      console.log ("button was clicked")
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
         ingredientList.appendChild(newItem);
         foodSearchInput.value = "";
      }
   }
});

generateBtn.addEventListener("click", (e) => {

   // Creates Parameters from the list of added ingredients to pass into API

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

   fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${parameters}&ranking=2&ignorePantry=true&number=6`, {
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
         let tempRecipeDIV = `<div class="img-container">
         <p>Recipe: ${recipe.title}</p>
         <img src="${recipe.image}">
         </div>`
         recipeDIV.innerHTML += tempRecipeDIV  
      }
   })
   .catch(err => {
      console.error(err);
   });
   fetchJoke()
   recipeDIV.value = "";
});
rootDIV.appendChild(recipeDIV)
console.log(addedIngredientsDIV)

