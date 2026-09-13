const recipes = [

{
name:"Maggi",
image:"https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800",
ingredients:["maggi","water"],
instructions:[
"Boil water",
"Add Maggi noodles",
"Add tastemaker",
"Cook for 2 minutes"
]
},

{
name:"Omelette",
image:"https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800",
ingredients:["egg","onion","salt"],
instructions:[
"Beat eggs",
"Add onion and salt",
"Cook on pan",
"Serve hot"
]
},

{
name:"Sandwich",
image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
ingredients:["bread","tomato","cheese"],
instructions:[
"Place cheese and tomato",
"Toast bread",
"Serve"
]
},

{
name:"French Toast",
image:"https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800",
ingredients:["bread","egg","milk"],
instructions:[
"Dip bread in egg mixture",
"Cook on pan",
"Serve hot"
]
},

{
name:"Fruit Salad",
image:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800",
ingredients:["apple","banana","orange"],
instructions:[
"Cut fruits",
"Mix together",
"Serve chilled"
]
},

{
name:"Tea",
image:"https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800",
ingredients:["tea","milk","water","sugar"],
instructions:[
"Boil water",
"Add tea",
"Add milk and sugar",
"Serve"
]
},

{
name:"Coffee",
image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
ingredients:["coffee","milk","sugar"],
instructions:[
"Heat milk",
"Add coffee",
"Mix well",
"Serve"
]
},

{
name:"Cheese Toast",
image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
ingredients:["bread","cheese"],
instructions:[
"Add cheese on bread",
"Toast",
"Serve"
]
},

{
name:"Milkshake",
image:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800",
ingredients:["milk","banana","sugar"],
instructions:[
"Blend ingredients",
"Serve chilled"
]
},

{
name:"Boiled Egg",
image:"https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=800",
ingredients:["egg","water"],
instructions:[
"Boil water",
"Add eggs",
"Cook for 10 minutes",
"Serve"
]
},

{
name:"Paneer Sandwich",
image:"https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800",
ingredients:["bread","paneer","tomato"],
instructions:[
"Add paneer and tomato",
"Toast sandwich",
"Serve"
]
},

{
name:"Lemon Water",
image:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800",
ingredients:["lemon","water","sugar"],
instructions:[
"Mix ingredients",
"Stir well",
"Serve chilled"
]
}

];

const result = document.getElementById("result");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const suggestions = document.getElementById("suggestions");

document
.getElementById("darkModeBtn")
.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

function saveHistory(text){

    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    if(!history.includes(text)){
        history.unshift(text);
    }

    history = history.slice(0,5);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    showHistory();
}

function showHistory(){

    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    const historyDiv =
    document.getElementById("history");

    historyDiv.innerHTML = history
    .map(item =>
    `<div class="history-item">${item}</div>`)
    .join("");
}

function addFavorite(recipeName){

    let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    if(!favorites.includes(recipeName)){
        favorites.push(recipeName);
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    showFavorites();
}

function showFavorites(){

    let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    document.getElementById("favorites").innerHTML =
    favorites.map(item =>
    `<div class="favorite-item">❤️ ${item}</div>`
    ).join("");
}

function displayRecipes(foundRecipes){

    if(foundRecipes.length === 0){

        result.innerHTML = `
        <div class="no-result">
        <h2>No Recipe Found 😔</h2>
        <p>Try another recipe or ingredients.</p>
        </div>
        `;

        return;
    }

    result.innerHTML =
    foundRecipes.map(recipe => `
    <div class="recipe-card">

        <img src="${recipe.image}" alt="${recipe.name}">

        <div class="recipe-content">

            <h3>${recipe.name}</h3>

            <p>
            <strong>Ingredients:</strong><br>
            ${recipe.ingredients.join(", ")}
            </p>

            <strong>Instructions:</strong>

            <ol>
            ${recipe.instructions
            .map(step => `<li>${step}</li>`)
            .join("")}
            </ol>

            <button
            class="favorite-btn"
            onclick="addFavorite('${recipe.name}')">
            ❤️ Add To Favorites
            </button>

        </div>

    </div>
    `).join("");
}

function searchRecipes(){

    const query =
    searchInput.value
    .toLowerCase()
    .trim();

    if(query === ""){
        return;
    }

    saveHistory(query);

    document.getElementById("loader")
    .style.display = "block";

    result.innerHTML = "";

    setTimeout(()=>{

        let foundRecipes = [];

        if(query.includes(",")){

            let userIngredients =
            query.split(",")
            .map(item => item.trim());

            foundRecipes =
            recipes.filter(recipe =>
                recipe.ingredients.every(item =>
                userIngredients.includes(item))
            );

        }else{

            foundRecipes =
            recipes.filter(recipe =>
            recipe.name
            .toLowerCase()
            .includes(query));
        }

        document.getElementById("loader")
        .style.display = "none";

        displayRecipes(foundRecipes);

    },1000);
}

searchBtn.addEventListener(
"click",
searchRecipes
);

searchInput.addEventListener(
"keyup",
function(){

    const value =
    this.value.toLowerCase();

    if(value.length === 0){
        suggestions.innerHTML = "";
        return;
    }

    const matched =
    recipes.filter(recipe =>
    recipe.name
    .toLowerCase()
    .includes(value));

    suggestions.innerHTML =
    matched
    .slice(0,5)
    .map(recipe =>
    `<div class="suggestion-item"
     onclick="fillSearch('${recipe.name}')">
     ${recipe.name}
     </div>`
    ).join("");
}
);

function fillSearch(name){

    searchInput.value = name;

    suggestions.innerHTML = "";

    searchRecipes();
}

showHistory();
showFavorites();
displayRecipes(recipes);