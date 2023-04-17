import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import Head from "next/head";

function View({ recipeList }) {
  const [itemNum, setItemNum] = useState(0);

  function handleDislike() {
    console.log("disliked");
    // get a new recipe
    setItemNum(itemNum + 1);
  }

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
    var curr_recipes = JSON.parse(window.localStorage.getItem("recipes"));
    // if there have been no liked this session, make it an empty list
    if (!curr_recipes) {
      curr_recipes = [];
    }
    // add the liked object to the session array of likes
    var liked_recipes = [...curr_recipes, obj];
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
        <div>
          <div className="h-80 w-80 m-auto md:w-[600px] md:h-[400px] object-cover overflow-hidden drop-shadow-md">
            <div className="flex justify-center">
              <Image
                src={recipeList["recipes"][itemNum]["image"]}
                alt={"Food Image"}
                width={400}
                height={400}
                className="rounded-md"
                priority
              />
            </div>
          </div>
          <h1 className="font-bold text-lg mt-10">
            {recipeList["recipes"][itemNum]["title"]}
          </h1>
          <p className="text-[#848484] text-sm md:w-[600px] bg-gray-50">
            {ReactHtmlParser(recipeList["recipes"][itemNum]["summary"])}
          </p>
          {/* <ul className="text-lg text-[#848484] w-96 lg:w-[400px] list-disc ml-5">
					{recipeList["recipes"][0]["extendedIngredients"].map(
						(ingObj, index) => {
							return <li key={index}>{ingObj["original"]}</li>;
						}
					)}
				</ul> */}
          <div className="mt-5 grid grid-cols-2 gap-10">
            <button
              onClick={handleDislike}
              className="rounded-md drop-shadow-md bg-red-500 hover:bg-red-600 px-3 py-2 text-white font-semibold"
            >
              Dislike
            </button>
            <button
              onClick={handleLike}
              className="rounded-md drop-shadow-md bg-green-500 hover:bg-green-600 px-3 py-2 text-white font-semibold"
            >
              Like
            </button>
          </div>
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

  var unformatted_diet = "";
  var unformatted_intolerances = "";
  var isEmpty = "good"

  if (intolerances) {
    intolerances.map((str) => {
      unformatted_intolerances += str + ",";
    });
  }
  if (diet) {
    diet.map((str) => {
      str = str.replace(" ", "%20")
      unformatted_diet += str + ",";
    });
  }

  var formatted_intolerances = unformatted_intolerances.toLowerCase().slice(0, -1);
  var formatted_diet = unformatted_diet.toLowerCase().slice(0, -1);
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
    maxCalories: maxCalories
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
