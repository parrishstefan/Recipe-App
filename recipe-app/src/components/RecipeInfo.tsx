import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { useState } from "react";

console.log(process.env.TEST);

type Nutrient = {
  name: string;
  amount: number;
  unit: string;
};

type RecipeInfoProps = {
  id: number;
  title: string;
  image: string;
  nutrition?: {
    nutrients: Nutrient[];
  };
  sourceUrl?: string;
};

export default function RecipeInfo({
  id,
  title,
  image,
  nutrition,
}: RecipeInfoProps) {
  const [liked, setLiked] = useState(
    window.localStorage.getItem("likes")?.includes(id.toString())
  );

  async function handleLike() {
    const toastId = toast.loading("One moment please...");

    // if already liked, remove from likes
    if (liked) {
      setLiked(false);
      // remove from local storage
      let currentLikes = localStorage.getItem("likes");
      if (currentLikes) {
        let likes = JSON.parse(currentLikes);
        let newLikes = likes.filter((recipe: any) => recipe.id !== id);
        localStorage.setItem("likes", JSON.stringify(newLikes));
      }
      toast.success("Recipe removed from favorites!", { id: toastId });
      return;
    }

    // handle recipes not yet liked
    setLiked(true);
    // fetch the sourceURL for the current ID
    let data = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=f608c0ffdab04920b1cd30e96c569b2c`
    );

    let recipe = await data.json();
    let sourceUrl = recipe.sourceUrl;
    let currentRecipe = {
      id,
      title,
      image,
      sourceUrl,
    };

    let currentLikes = localStorage.getItem("likes");

    // add the id to the likes array in local storage
    if (currentLikes) {
      let likes = JSON.parse(currentLikes);
      likes.push(currentRecipe);
      localStorage.setItem("likes", JSON.stringify(likes));
    } else {
      localStorage.setItem("likes", JSON.stringify([currentRecipe]));
    }
    toast.success("Recipe added to favorites!", { id: toastId });
  }

  return (
    <div className="flex space-x-8 bg-gray-100 border border-gray-900 p-4 rounded-xl">
      <div className="flex-shrink-0">
        <Image
          src={image}
          alt={title}
          height={100}
          width={100}
          className="h-full aspect-square rounded-xl"
        />
      </div>

      <div className="flex flex-col justify-center space-y-4 w-full overflow-hidden">
        <div className="space-y-2">
          <p className="text-xl font-bold truncate">{title}</p>

          {
            // if nutrition is not defined, then don't render the nutrition info
            nutrition && (
              <p className="text-lg truncate">
                {nutrition.nutrients[0].amount}kcal,{" "}
                {nutrition.nutrients[1].amount}g
              </p>
            )
          }
        </div>
      </div>
      <div className="flex items-center">
        <HeartIcon
          className={
            "h-6 w-6 text-green-600 hover:fill-gray-300 hover:cursor-pointer" +
            (liked ? " fill-green-600" : "")
          }
          onClick={() => {
            handleLike();
          }}
        />
      </div>
    </div>
  );
}
