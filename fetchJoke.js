async function fetchJoke() {

   const response = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/jokes/random?rapidapi-key=379fb0a048mshc2b84dfb3126e66p19db79jsnb00c0294a230");
   const data = await response.json();
   const jokeDIV = document.getElementById("joke")
   
   console.log("From fetch Joke", data); // object
   // const tempJoke = data.data;
 
   for (let value in data) {
      // console.log(`${data[value]}`)
   
      let tempJokeHTML = `
      <div class="accordion" id="accordionExample">
      <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
         <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            You've generated a random joke!
         </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
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