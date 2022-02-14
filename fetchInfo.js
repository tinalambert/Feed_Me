import {dataArray} from "./top-1k-ingredients.js";
// import { fetchRecipes } from "./fetchRecipes.js";
// // console.log(dataArray);
// fetchRecipes();

const foodSearchDIV = document.getElementById("foodSearch");
console.log(foodSearchDIV)
const foodList = document.getElementById("foodlistOptions");
console.log(foodList)
let addedIngredientsDIV = document.getElementById("addedIngredients");
console.log("This is the", addedIngredientsDIV);
// set parameters for fetch API
let parameters = addedIngredientsDIV.textContent.trim();
const foodSearchInput = document.getElementById("foodDataList");
console.log(foodSearchInput)
let ingredientList = document.getElementById("ingredientList");
console.log(ingredientList)
// let finalIngredientList = document.getElementsByClassName("list-group-item")

// Capture ingredients from top-1k-ingredients.js file
dataArray.forEach(ingredient => {
   //console.log(ingredient.description)
   let searchItem = `<option value="${ingredient}">`;
   foodList.innerHTML += searchItem
});

// foodList.forEach(finalIngredient => {
//    let parameters = `${finalIngredient}`
//    console.log(parameters)
// })
// ADD SELECTED ITEM TO MY LIST
// function addItem() {
   
   // -- FETCH THE RECIPE API DATA -- 
   // spoonacular?
   foodSearchDIV.addEventListener("click", (e) => {
      
      if (e.target.tagName == "BUTTON") {
      console.log ("button was clicked")
      // Should add newItem to ingredientList with the correct CSS presentation
      let selectedItem = foodSearchInput.value; // value of the searched ingredient
      // console.log(selectedItem)
      let newItem = document.createElement('li');
      let newInput = document.createElement('input');
      let newLabel = document.createElement('label')
      
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

const spoonacular = "https:api.spoonacular.com";
// fetch("https://api.spoonacular.com/recipes/findByIngredients?apiKey=f37b1704fbf64d6b983628a89b0b8451", {
   // const food = `${ingredient}`; // getting from element
   
   fetch(`${spoonacular}/recipes/findByIngredients?apiKey=f37b1704fbf64d6b983628a89b0b8451&${parameters}`, {
      
      method: 'GET',
      headers: {
         // 'Access-Control-Allow-Origin': 'spoonacular.com',
         'Content-Type': 'application/json',
         // 'Allow': 'GET, POST, HEAD',
      },
      
   })
   .then(response => {
      console.log('resolved', response)
      return response.json()
   })
   .then(data => {
      console.log(data, 111);
      
   })
   .catch(error => {
      console.log("rejected", error)
   })

   console.log(addedIngredientsDIV)
   console.log(parameters)

//console.log(ingredientList)

// Grab the value of the addedIngredient, and pass that value into the URL parameter
  

