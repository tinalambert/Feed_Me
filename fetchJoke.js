async function fetchJoke() {
   const response = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/jokes/random?rapidapi-key=379fb0a048mshc2b84dfb3126e66p19db79jsnb00c0294a230");
   const data = await response.json();
   const jokeDIV = document.getElementById("joke")
 
   for (let value in data) {
   
      let tempJokeHTML = `
      <div class="accordion container-fluid px-4" id="accordionExample">
         <div class="accordion-item row">
      
         <h2 class="accordion-header col-md-6 offset-md-3 mb-3" id="headingOne">
            <button class="accordion-button bi bi-emoji-laughing  " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            You've generated a random joke!
            </button>
         </h2>
         <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
               <strong>JOKE:</strong> ${data[value]}
            </div>
         </div>
      </div>
   </div>`
   jokeDIV.innerHTML += tempJokeHTML;
   }
}
export {fetchJoke};