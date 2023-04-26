import { useState } from "react";

import Image from "next/image";
import Head from "next/head";

import RecipeInfo from "@/components/RecipeInfo";

function View({ recipeList }) {
  function handleLike() {
    console.log("liked");
    // get a new recipe & save recipe ID to json file

    // make recipe object
    const obj = {
      recipeID: recipeList["recipes"][itemNum]["id"],
      title: recipeList["recipes"][itemNum]["title"],
      url: recipeList["recipes"][itemNum]["sourceUrl"],
      servings: recipeList["recipes"][itemNum]["servings"],
      mealType: recipeList["recipes"][itemNum]["dishTypes"][0],
      readyIn: recipeList["recipes"][itemNum]["readyInMinutes"],
      image: recipeList["recipes"][itemNum]["image"],
      healthScore: recipeList["recipes"][itemNum]["healthScore"],
      aggregateLikes: recipeList["recipes"][itemNum]["aggregateLikes"],
      summary: recipeList["recipes"][itemNum]["summary"],
    };

    // save to session storage
    // first retrieve the current list of liked recipes
    let curr_recipes = JSON.parse(window.localStorage.getItem("recipes"));
    // if there have been no liked this session, make it an empty list
    if (!curr_recipes) {
      curr_recipes = [];
    }
    // add the liked object to the session array of likes
    let liked_recipes = [...curr_recipes, obj];
    console.log(liked_recipes);
    // write to the session storage again with the new added recipe
    window.localStorage.setItem("recipes", JSON.stringify(liked_recipes));

    // get a new recipe
    setItemNum(itemNum + 1);
  }

  return (
    <div>
      <Head>
        <title>Tender: View Recipes</title>
      </Head>
      <div className="flex justify-center my-12 mx-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipeList.recipes.map((recipe) => (
            <RecipeInfo key={recipe.id} {...recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}

View.getInitialProps = async (ctx) => {
  const intolerances = JSON.parse(window.localStorage.getItem("intolerances"));
  const diet = JSON.parse(window.localStorage.getItem("diet"));
  const minCalories = JSON.parse(window.localStorage.getItem("minCalories"));
  const maxCalories = JSON.parse(window.localStorage.getItem("maxCalories"));
  const minProtein = JSON.parse(window.localStorage.getItem("minProtein"));
  const maxProtein = JSON.parse(window.localStorage.getItem("maxProtein"));

  let unformatted_diet = "";
  let unformatted_intolerances = "";
  let isEmpty = "good";

  if (intolerances) {
    intolerances.map((str) => {
      unformatted_intolerances += str + ",";
    });
  }
  if (diet) {
    diet.map((str) => {
      str = str.replace(" ", "|");
      unformatted_diet += str + ",";
    });
  }

  let formatted_intolerances = unformatted_intolerances
    .toLowerCase()
    .slice(0, -1);
  let formatted_diet = unformatted_diet.toLowerCase().slice(0, -1);
  if (!formatted_intolerances && !formatted_diet) {
    isEmpty = "none";
  }

  let payload = {
    isEmpty: isEmpty,
    intolerances: formatted_intolerances,
    diet: formatted_diet,
    minProtein: minProtein,
    maxProtein: maxProtein,
    minCalories: minCalories,
    maxCalories: maxCalories,
  };

  console.log(payload);

  const res = await fetch("http://localhost:3000/api/getRecipes", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  console.log(json);

  return { recipeList: json };
};

export default View;
