const foodSearchDIV = document.getElementById("foodSearch");
// console.log(foodSearch)
const foodList = document.getElementById("foodlistOptions");
console.log(foodList)
let addedIngredientsDIV = document.getElementById("addedIngredients");
// console.log(addedIngredientsDIV);
const foodSearchInput = document.getElementById("foodDataList");
console.log(foodSearchInput)
let ingredientList = document.getElementById("ingredientList");
console.log(ingredientList)

// -- FETCH THE API DATA -- 

fetch("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=jpBJwOYeophbBI9AwtYhvOsd6ffKSU066SFWQgkj", {

   method: 'GET',
   headers: {
      'Content-Type': 'application/json',
      // 'Allow': 'GET, POST, HEAD',
   },
   
})
.then(response => {
   console.log('resolved', response)
	return response.json()
})
.catch(error => {
   console.log("rejected", error)
})
.then(data => {
   console.log(data);
   const foods = data.foods;
   console.log(foods)

   // -- GET FOOOD ITEM ARRAY FROM FETCH DATA --
   // How to get the full array from all pages?
   foods.forEach(ingredient => {
      //console.log(ingredient.description)
      let searchItem = `<option value="${ingredient.description}">`;
      foodList.innerHTML += searchItem
   })
});

// ADD SELECTED ITEM TO MY LIST
function addItem() {
   // Should add newItem to ingredientList with the correct CSS presentation
   
   let selectedItem = foodSearchInput.value; // value of the searched ingredient
   let newItem = document.createElement('li');
   newItem.textContent = selectedItem;
   newItem.className = "list-group-item"
   ingredientList.appendChild(newItem);
   foodSearchInput.value = "";

   // ONLY ADD THE ITEM IF IT'S PART OF THE DATA LIST
   
   // if (selectedItem.value.tagName == "DATALIST") {
   //    ingredientList.appendChild(newItem);
   // } else {
   //    foodSearchInput.value = "";
   //    return;

   // }
   //console.log(newItem)
   


// REMOVE LIST ITEMS BUTTON

   // foodSearchDIV.addEventListener("click", (e) => {
   //    if (e.target.tagName == "BUTTON") {
   //       console.log("Add button was clicked!")
   //    }
   // })
}

