const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
let registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");

// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  // console.log(searchInputTxt);

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      // Process the data
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `<div
          class=" meal-item flex items-center py-4 md:py-0 justify-center shadow-2xl rounded-2xl" data-id="${meal.idMeal}"
        >
          <div class="meal-img">
            <img src="${meal.strMealThumb}" class="" alt="food" />
            <div class="meal-name text-center">
              <h3 class="text-xl font-bold">${meal.strMeal}</h3>
              <a href="#" class="recipe-btn text-gray-500">Get Recipe</a>
            </div>
          </div>
        </div>`;
        });
        mealList.classList.remove("notFound");
      } else {
        html = `Sorry, we couldn't find your meal! Click the link below to share your special recipe <a class="underline text-2xl text-red-700 font-bold pl-0 ml-0" href="location =
          share.html">Share Your recipe</a>`;
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
  // .catch((error) => {
  //   console.error("Error:", error);
  // });
}

// get recipe
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.closest(".meal-item");
    let mealId = mealItem.dataset.id;
    console.log("Meal Id", mealId);
    if (mealId) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((response) => response.json())
        .then((data) => {
          // Process and display the recipe details
          mealRecipeModal(data.meals);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("Meal ID is not found.");
    }
  }
}

function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
  <h2 class="recipe-title">${meal.strMeal}</h2>
  <p class="recipe-category">${meal.strCategory}</p>
  <div class="recipe-instruct">
    <h3>Instruction:</h3>
    <p>
      ${meal.strInstructions}
    </p>
  </div>
  <div class="recipe-meal-img">
    <img src="${meal.strMealThumb}" alt="food" />
  </div>
  <div class="recipe-link">
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
  </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}

// handle recipe creation

const recipeForm = document.getElementById("recipe-form");
const title = document.getElementById("title");
const ingredients = document.getElementById("ingredients");
const instructions = document.getElementById("instructions");
const shareBtn = document.getElementById("share-btn");

