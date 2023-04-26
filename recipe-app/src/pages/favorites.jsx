import Head from "next/head";

import LikedRecipe from "@/components/LikedRecipe";
import { useEffect, useState } from "react";

function Favorites({ FavoriteRecipes }) {
  const [recipes, setRecipes] = useState(FavoriteRecipes);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let localrecipes = JSON.parse(window.localStorage.getItem("likes"));
      if (localrecipes) {
        setRecipes(localrecipes);
      }
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Tender: View Recipes</title>
      </Head>
      <div className="flex justify-center my-12 mx-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <LikedRecipe key={recipe.id} {...recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}

Favorites.getInitialProps = async (ctx) => {
  if (typeof window !== "undefined") {
    let recipes = JSON.parse(window.localStorage.getItem("likes"));
    if (!recipes) {
      recipes = [];
    }
    return {
      FavoriteRecipes: recipes,
    };
  } else {
    return {
      FavoriteRecipes: [],
    };
  }
};

export default Favorites;
